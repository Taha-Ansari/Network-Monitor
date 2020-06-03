#!/usr/bin/python
import nmap
import sys
from os import path

def pulse_scan(db_path):    
    nm = nmap.PortScanner()
    scan_results = {}
    current_db = load_db(db_path)

    host = input("Enter IP: ") or "192.168.2.114" # defaults for testing
    subnet = input("Enter Subnet: ") or "24"

    nm.scan(hosts='{}/{}'.format(host, subnet), arguments='-sP')
    hosts = nm.all_hosts()
    for ip in hosts:
        # Nmap scan does not grab information about the host itself but still appears on the list
        if ip != host:
            mac = nm[ip]['addresses']['mac']
            vendor = nm[ip]['vendor'][mac]
            scan_results[ip] = {'mac': mac, 'vendor': vendor, 'user': 'N/A', 'description': 'N/A'}
    for ip in scan_results:
        if not dict_has_mac(current_db, scan_results[ip]['mac']):
            write_db(db_path, ip, scan_results[ip])
            print('New Entry: ip: {}  mac: {}  vendor: {}'.format(ip, scan_results[ip]['mac'], scan_results[ip]['vendor']))

def dict_has_mac(info_dict, mac):
    for key in info_dict:
        if info_dict[key]['mac'] == mac:
            return True
    return False

def print_err():
    print("Error, Please select a valid option")

def print_menu():
    print("\n1) Pulse Scan \n2) Show Database \n3) Exit\n")

def load_db(db_path):
    info_dict = {}
    counter = 0
    with open(db_path, 'r') as f:
        f.readline()
        for line in f:
            if line == "\n": break
            line = line.strip().split(',')
            info_dict[counter] = {
                'ip': line[0],
                'mac': line[1],
                'vendor': line[2],
                'user': line[3],
                'description': line[4],
                'verified': line[5]
            }
            counter+= 1       
    return info_dict

def write_db(db_path, ip, new_data):
    # Update csv
    with open(db_path, 'a+') as f:
        f.write("{},{},{},{},{},False\n".format(ip, new_data['mac'], new_data['vendor'], new_data['user'], new_data['description']))

if __name__ == '__main__':
    db_path = 'db.csv'
    db_dict = {}

    # Check if DB exists else create DB
    if path.exists(db_path):
        db_dict = load_db(db_path)
    else:
        with open(db_path, 'w+') as f:
            f.write('ip, mac, vendor, user, description, verified\n')
        print("No db file found, created {}".format(db_path))

    # Program Loop
    while 1:
        db_dict = load_db(db_path)
        print_menu()
        choice = input("Selection: ")        
        if choice == '1':
            pulse_scan(db_path)
        elif choice == '2':
            print(db_dict.__str__())
        elif choice == '3':
            sys.exit()
        else:
            print_err()