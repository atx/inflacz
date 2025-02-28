#!/usr/bin/env python3

import argparse
import requests
import logging
from pathlib import Path
from typing import Optional
from datetime import datetime

class CSUDownloader:
    """Downloads data from Czech Statistical Office (ČSÚ)."""
    
    BASE_URL = "https://vdb.czso.cz/vdbvo2/faces/cs/xmlexp"
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:133.0) Gecko/20100101 Firefox/133.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br, zstd'
        })

    def download_price_data(self, year: int, output_path: Optional[Path] = None, version: str = "v10111") -> str:
        """
        Downloads price data from ČSÚ for a specific year.
        
        Args:
            year: The year for which to download data
            output_path: Optional path to save the data to
            version: The version code for the ČSÚ API (defaults to v10111)
            
        Returns:
            str: The downloaded data as a string
        """
        # Validate year
        current_year = datetime.now().year
        if not (1990 <= year <= current_year):
            raise ValueError(f"Year must be between 1990 and {current_year}")

        params = {
            'page': 'vystup-objekt',
            'z': 'T',
            'f': 'TABULKA',
            'skupId': '2198',
            'katalog': '31779',
            'pvo': 'CEN082A',
            'evo': [
                f'{version}_!_CEN082A-{year}_1',
                'v9744_!_CEN08klasifikacelek-kopie_1'
            ],
            'str': 'v3409',
            'kodjaz': '203',
            'nasexp': 'ss',
            'expJenKody': 'N',
            'expdefinice': 'A',
            'datovytyp': 'A',
            'expatrib': 'A',
            'expcasdb': 'A'
        }
        
        try:
            response = self.session.get(
                self.BASE_URL,
                params=params,
                headers={
                    'Referer': f'https://vdb.czso.cz/vdbvo2/faces/cs/index.jsf?page=vystup-objekt&pvo=CEN082A&z=T&f=TABULKA&skupId=2198&katalog=31779&evo={version}_!_CEN082A-{year}_1&&evo=v9744_!_CEN08klasifikacelek-kopie_1&str=v3409'
                }
            )
            response.raise_for_status()
            
            if output_path:
                output_path.write_text(response.text, encoding='utf-8')
                logging.info(f"Data saved to {output_path}")
            
            return response.text
            
        except requests.RequestException as e:
            logging.error(f"Failed to download data: {str(e)}")
            raise

def parse_args() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description='Download price data from Czech Statistical Office (ČSÚ)',
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )
    
    parser.add_argument(
        '-y', '--year',
        type=int,
        required=True,
        help='Year for which to download data (1990-current)'
    )
    
    parser.add_argument(
        '-o', '--output',
        type=Path,
        required=True,
        help='Output file path'
    )
    
    parser.add_argument(
        '-v', '--verbose',
        action='store_true',
        help='Enable verbose logging'
    )
    
    # Add new version argument
    parser.add_argument(
        '--version',
        type=str,
        default='v10111',
        help='Version code for the ČSÚ API (default: v10111)'
    )
    
    return parser.parse_args()

def main():
    """Main function to run the CLI utility."""
    args = parse_args()
    
    # Setup logging
    log_level = logging.DEBUG if args.verbose else logging.INFO
    logging.basicConfig(
        level=log_level,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    
    try:
        downloader = CSUDownloader()
        logging.info(f"Downloading price data for year {args.year}")
        downloader.download_price_data(args.year, args.output, args.version)

    except Exception as e:
        logging.error(f"Error: {str(e)}")
        exit(1)

if __name__ == "__main__":
    main()
