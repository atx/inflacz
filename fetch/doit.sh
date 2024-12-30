#!/bin/bash

# Exit on any error
set -e

# Get current year
current_year=$(date +"%Y")
start_year=2018

# Create arrays to store filenames
declare -a xml_files
declare -a process_args

# First, fetch all XML files
echo "Fetching XML files..."
for year in $(seq $start_year $current_year)
do
    output_file="eucoicop_${year}.xml"
    echo "Fetching data for ${year}..."
    ./fetch.py -y ${year} -o ${output_file}
    xml_files+=("${output_file}")
done

# Process all XML files together
echo -e "\nProcessing XML files..."
output_file="output_$(date +"%Y%m%d").json"
echo "Processing all files..."
./process.py "${xml_files[@]}"
