#! /usr/bin/env python3

import argparse
import collections
import csv
import json

from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from typing import List, Mapping
from pathlib import Path
from lxml import etree


# These classes mirror the CSV structure


@dataclass(frozen=True)
class Element:
    dim: str
    dimText: str
    ciselnik: str
    kod: str
    text: str

    @staticmethod
    def parse(elem):
        return Element(
            dim=elem.findtext("dim"),
            dimText=elem.findtext("dimText"),
            ciselnik=elem.findtext("ciselnik"),
            kod=elem.findtext("kod"),
            text=elem.findtext("text")
        )


@dataclass(frozen=True)
class Time:
    casOd: datetime.date
    casDo: datetime.date
    bazOd: datetime.date
    bazDo: datetime.date

    @staticmethod
    def parse(elem):
        def parse_key(name):
            return datetime.strptime(elem.findtext(name), "%Y-%m-%d").date()

        return Time(
            casOd=parse_key("casOd"),
            casDo=parse_key("casDo"),
            bazOd=parse_key("bazOd"),
            bazDo=parse_key("bazDo")
        )


@dataclass(frozen=True)
class Entry:
    value: float
    time: Time
    element: Element


# These classes should mirror the definitions used in the app


@dataclass(frozen=True)
class TimePeriod:
    year: int
    month: int

    def __post_init__(self):
        if not 1 <= self.month <= 12:
            raise ValueError(f"Month must be between 1 and 12, got {self.month}")


@dataclass
class CategoryDefinition:
    # snake_case name
    id: str
    # Human readable name
    name: str
    # Description of the category
    description: str

    # List of ECOICOP numbers that are included in this category
    ecoicop_numbers: List[str] = field(default_factory=list)


@dataclass
class CategoryInflationData:
    category: CategoryDefinition
    rates: Mapping[TimePeriod, float]


CATEGORIES = [
    CategoryDefinition(
        id="food",
        name="Jídlo",
        description="""Všechno, co se dá jíst, od chleba až po kaviár.""",
        ecoicop_numbers=["011", "012"]
    ),
    CategoryDefinition(
        id="restaurants",
        name="Restaurace",
        description="Náklady na hotové jídlo z restaurací.",
        ecoicop_numbers=["111"]
    ),
    CategoryDefinition(
        id="alcohol",
        name="Alkohol a tabák",
        description="Všechny druhy alkoholických nápojů a tabákové výrobky.",
        ecoicop_numbers=["02"]
    ),
    # These are split from the 04 subcategory
    CategoryDefinition(
        id="housing_rent",
        name="Nájem bytu",
        description="Náklady na nájem bytu.",
        ecoicop_numbers=["041"]
    ),
    CategoryDefinition(
        id="housing_own",
        name="Vlastní bydlení",
        description="Náklady na vlastní bydlení, tzv imputovaný nájem.",
        ecoicop_numbers=["042"]
    ),
    CategoryDefinition(
        id="clothing",
        name="Oblečení a obuv",
        description="Oblečení, obuv a doplňky.",
        ecoicop_numbers=["03"]
    ),
    # TODO: Tady není moc jasné, jestli do tohohle
    CategoryDefinition(
        id="housing_utilities",
        name="Energie, voda a služby",
        description="Obsahuje ceny energií, vody a služeb spojených s bydlením.",
        ecoicop_numbers=["043", "044", "045"]
    ),
    CategoryDefinition(
        id="furniture",
        name="Nábytek a vybavení domácnosti",
        description="Nábytek, spotřebiče a jiné vybavení domácnosti.",
        ecoicop_numbers=["05"]
    ),
    CategoryDefinition(
        id="health",
        name="Zdravotní péče",
        description="Léky, zdravotní péče a pomůcky.",
        ecoicop_numbers=["06"]
    ),
    CategoryDefinition(
        id="transport_personal",
        name="Osobní doprava",
        description="Náklady na osobní dopravu.",
        ecoicop_numbers=["071", "072"]
    ),
    CategoryDefinition(
        id="transport_public",
        name="Veřejná doprava",
        description="Náklady na veřejnou dopravu.",
        ecoicop_numbers=["073"]
    ),
    CategoryDefinition(
        id="communication",
        name="Komunikace",
        description="Telekomunikační služby.",
        ecoicop_numbers=["081", "083"]
    ),
    CategoryDefinition(
        id="computers",
        name="Výpočetní technika",
        description="Mobilní telefony, počítače a jiná elektronika.",
        ecoicop_numbers=["082", "091"]
    ),
    # TODO: This should probably be split
    # imho bych oddělil věci jako počítače a elektroniku od věcí jako knihy a noviny od věcí jako vstupenky do divadla etc
    CategoryDefinition(
        id="recreation",
        name="Rekreace a kultura",
        description="Vstupy do kina, na koncerty, knihy, ale i sportovní vyžití, včetně sportovní výbavy.",
        ecoicop_numbers=["092", "093", "094", "095", "096"]
    ),
    # TODO: Co to kurva je?
    CategoryDefinition(
        id="education",
        name="Vzdělávání",
        description="Náklady na vzdělání.",
        ecoicop_numbers=["10"]
    ),
    CategoryDefinition(
        id="hotels",
        name="Ubytovací služby",
        description="Náklady na ubytování v hotelech a podobných ubytovacích zařízeních.",
        ecoicop_numbers=["112"]
    ),
    # TODO: Tuhle kategorii bohužel nemáme v našich datech rozdělenou, což
    # trochu suckuje
    CategoryDefinition(
        id="miscellaneous",
        name="Ostatní výrobky a služby",
        description="Všechno ostatní.",
        ecoicop_numbers=["12"]
    ),
]


def load_xml(input_file: Path):
    input_string = input_file.read_text()
    # Remove xmlns
    input_string = input_string.replace('xmlns="http://vdb.czso.cz/xml/export"', '')
    tree = etree.fromstring(input_string.encode())
    return tree


def extract_elements(root):
    elements = {}
    for elem in root.iterfind('.//metaSlovnik/vecneUpresneni/element'):
        element = Element.parse(elem)
        if element.dim != "ECOICOP":
            continue
        elements[elem.get("ID")] = element
    return elements


def extract_times(root):
    times = {}
    for elem in root.iterfind('.//metaSlovnik/obdobi/cas'):
        time = Time.parse(elem)
        times[elem.get("ID")] = time
    return times


def parse_xml(input_file: Path, output_file: Path):
    root = load_xml(input_file)

    elements = extract_elements(root)
    times = extract_times(root)

    # And now for the final trick. Extract the data itself

    entries = collections.defaultdict(list)

    for udaj in root.iterfind('.//data/udaj'):
        value = float(udaj.findtext("hod"))
        time = times[udaj.findtext("cas")]

        # We only care about the monthly entries
        if time.casDo - time.casOd > timedelta(days=40):
            continue

        # TODO: Ideally, we would just look for the n-thn <vec> element
        element = next(
            (elements[vec.text] for vec in udaj.iterfind("vec") if vec.text in elements), None
        )
        if element is None:
            continue
        entry = Entry(value=value, time=time, element=element)
        entries[element].append(entry)

    return entries


def check_all_categories_covered(entries: Mapping[Element, List[Entry]]):
    # In this function, we verify that all ECOICOP numbers are covered
    # by the categories we have defined. This is somewhat non-trivial
    # due to the tree structure of the ECOICOP numbers.
    are_covered = {
        entry.element.kod: False
        for entry_list in entries.values()
        for entry in entry_list
    }

    for category in CATEGORIES:
        for ecoicop_number in category.ecoicop_numbers:
            assert ecoicop_number in are_covered, f"ECOICOP number {ecoicop_number} not found in the data"
            for key in are_covered:
                if key.startswith(ecoicop_number):
                    assert not are_covered[key], f"ECOICOP number {key} is covered by multiple categories"
                    are_covered[key] = True

    def is_covered(ecoicop_number):
        if are_covered[ecoicop_number]:
            return True
        # Check if all children are covered
        children_numbers = [
            key for key in are_covered.keys()
            if key.startswith(ecoicop_number) and key != ecoicop_number
        ]
        # Beware of leaf categories
        if children_numbers and all(is_covered(key) for key in children_numbers):
            return True
        return False

    for key in are_covered.keys():
        if not is_covered(key):
            assert False, f"ECOICOP number {key} is not covered (either fully or partially) by any category"

    return True


@dataclass(frozen=True)
class ConsumerBasketItem:
    ecoicop: str
    name: str
    unit: str
    weight: float


@dataclass
class ConsumerBasket:
    items: List[ConsumerBasketItem]

    @staticmethod
    def _normalize_ecoicop(ecoicop: str) -> str:
        return ecoicop.replace(".", "").replace("E", "")

    @staticmethod
    def load_from_path(basket_csv: Path) -> "ConsumerBasket":
        # Looks like
        # ECOICOP,NAZEV,MĚRNÁ JEDNOTKA,,VÁHA v ‰
        # E00,ÚHRN, , ,1000.000000
        # E01,POTRAVINY A NEALKOHOLICKÉ NÁPOJE, , ,177.431636
        # E01.1,Potraviny, , ,160.863507
        # E01.11,Pekárenské výrobky; obiloviny, , ,28.362751

        items = []
        with basket_csv.open() as f:
            f.readline()  # Skip the header
            reader = csv.reader(f)
            for row in reader:
                ecoicop, name, unit, _, weight = row
                item = ConsumerBasketItem(
                    ConsumerBasket._normalize_ecoicop(ecoicop),
                    name,
                    unit,
                    float(weight) / 1000
                )
                items.append(item)
        return ConsumerBasket(items)

    @staticmethod
    def _check_that_ecoicops_are_not_overlapping(ecoicops: List[str]):
        # Check that none of the provided ecoicops are parents of one another
        for ecoicop in ecoicops:
            for other_ecoicop in ecoicops:
                if ecoicop.startswith(other_ecoicop) and ecoicop != other_ecoicop:
                    raise ValueError(f"ECOICOP {ecoicop} is a parent of {other_ecoicop}")
        return True

    def weigh_ecoicops(self, ecoicops: List[str]) -> float:
        # Consumes the ecoicops and returns the total weight of them in the
        # basket
        assert self._check_that_ecoicops_are_not_overlapping(ecoicops)
        total_weight = 0.0
        for item in self.items:
            if item.ecoicop in ecoicops:
                total_weight += item.weight
        return total_weight


def produce_inflation_data(entries: Mapping[Element, List[Entry]], basket: ConsumerBasket) -> List[CategoryInflationData]:
    result = []

    # First, validate that all entries follow our assumptions about dates
    for element_entries in entries.values():
        for entry in element_entries:
            # Verify that casOd is always first day of month
            assert entry.time.casOd.day == 1, f"Expected first day of month, got {entry.time.casOd}"
            # Verify that casDo is always last day of month
            assert entry.time.casDo.day in [28, 29, 30, 31], f"Expected last day of month, got {entry.time.casDo}"
            # Verify that they are in the same month
            assert entry.time.casOd.year == entry.time.casDo.year, "Expected same year"
            assert entry.time.casOd.month == entry.time.casDo.month, "Expected same month"

    # For each category, we need to:
    # 1. Find all relevant entries (based on ECOICOP numbers)
    # 2. Group them by time period
    # 3. Compute weighted average for each time period

    for category in CATEGORIES:
        # Get all entries for this category's ECOICOP numbers
        category_entries = []
        for element, element_entries in entries.items():
            if element.kod in category.ecoicop_numbers:
                category_entries.extend(element_entries)

        # Group entries by time period
        period_entries = collections.defaultdict(list)
        for entry in category_entries:
            period = TimePeriod(year=entry.time.casOd.year, month=entry.time.casOd.month)
            period_entries[period].append(entry)

        # For each time period, compute weighted average
        rates = {}
        for period, period_entry_list in period_entries.items():
            # Get weights for each ECOICOP number in this period
            weights = []
            values = []

            for entry in period_entry_list:
                weight = basket.weigh_ecoicops([entry.element.kod])
                assert weight > 0, f"Expected positive weight for ECOICOP {entry.element.kod}"
                weights.append(weight)
                values.append(entry.value)

            # Normalize weights
            total_weight = sum(weights)
            assert total_weight > 0, f"Expected positive total weight for category {category.id} in period {period}"
            normalized_weights = [w / total_weight for w in weights]
            # Compute weighted average
            weighted_value = sum(v * w for v, w in zip(values, normalized_weights))
            rates[period] = weighted_value

        # Create CategoryInflationData for this category
        category_data = CategoryInflationData(
            category=category,
            rates=rates
        )
        result.append(category_data)

    return result


def serialize_inflation_data(inflation_data: List[CategoryInflationData]):
    # Serialize into a JSON-serializable dict
    result = []
    for category_data in inflation_data:
        rates = {}
        for period, rate in category_data.rates.items():
            rates[f"{period.year}-{period.month:02d}"] = rate
        result.append({
            "id": category_data.category.id,
            "name": category_data.category.name,
            "description": category_data.category.description,
            "rates": rates
        })
    return result


def print_category_to_ecoicop_mapping(all_entries: Mapping[Element, List[Entry]]):
    # Unfortunately, we do not have the ecoicop descriptions anywhere else
    all_ecoicops = {}
    for element in all_entries.keys():
        all_ecoicops[element.kod] = element

    def print_it_and_children(entry: Element, level: int):
        print(f"{' ' * level}{entry.kod}: {entry.text}")
        for child_key in all_ecoicops.keys():
            if child_key.startswith(entry.kod) and child_key != entry.kod:
                print_it_and_children(all_ecoicops[child_key], level + 2)

    for category in CATEGORIES:
        print(f"Category {category.name}")
        for ecoicop in category.ecoicop_numbers:
            print_it_and_children(all_ecoicops[ecoicop], 2)


def make_csu_profile_preset(basket: ConsumerBasket):
    # The absolute amount is not very relevant here
    total_spend = 50000
    categories = []
    for category in CATEGORIES:
        category_data = {
            "categoryId": category.id,
            "amount": round(
                basket.weigh_ecoicops(category.ecoicop_numbers) * total_spend,
                ndigits=-1
            )
        }

        categories.append(category_data)

    total_weight = sum(category_data["amount"] for category_data in categories)
    assert abs(total_weight - total_spend) < 100, f"Expected total weight to be {total_spend}, got {total_weight}"

    return categories


def main():
    parser = argparse.ArgumentParser(description="Parse an XML file.")
    parser.add_argument(
        "-b", "--basket-csv",
        type=Path,
        help="Path to the basket CSV file",
        default=(Path(__file__).absolute().parent / "spot_kos2024.csv")
    )
    parser.add_argument('input_file', nargs="+", type=Path, help='Path to the input XML file')
    parser.add_argument(
        "-o", "--output-file",
        type=Path,
        help='Path to the output file',
        default=(Path(__file__).absolute().parent.parent / "data" / "inflationRates.ts"),
    )
    parser.add_argument(
        "-p", "--profile-file",
        type=Path,
        help='Path to the profile file with the default consumer basket',
    )

    args = parser.parse_args()

    print(f"Loading basket from {args.basket_csv}")
    basket = ConsumerBasket.load_from_path(args.basket_csv)

    all_entries = collections.defaultdict(list)
    for input_file in args.input_file:
        print(f"Processing {input_file}")
        entries = parse_xml(input_file, args.output_file)
        assert check_all_categories_covered(entries), "Not all ECOICOP numbers are covered by the categories"

        for key, value in entries.items():
            all_entries[key].extend(value)

    print_category_to_ecoicop_mapping(all_entries)

    inflation_data = produce_inflation_data(all_entries, basket)
    serialized_data = serialize_inflation_data(inflation_data)
    metadata_data = {
        "fetchedAt": datetime.now(timezone.utc).isoformat()
    }
    with args.output_file.open("w") as f:
        f.write("// This file is regenerated by process.py\n")
        # Add metadata
        f.write("export const inflationMetadata = ")
        json.dump(metadata_data, f, indent=2)
        f.write(";\n")
        # Write inflation rates
        f.write("export const inflationRates = ")
        json.dump(serialized_data, f, indent=2)
        f.write(";\n")
        print(f"Data written to {args.output_file}")

    if args.profile_file is not None:
        cats = make_csu_profile_preset(basket)
        with args.profile_file.open("w") as f:
            json.dump(cats, f, indent=2)


if __name__ == "__main__":
    main()
