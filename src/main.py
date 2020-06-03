#!/usr/bin/python
import nmap
import sys
from os import path

def pulse_scan():    
    host = input("Enter IP: ") or "192.168.2.114"
    subnet = input("Enter Subnet: ") or "24"
    nm = nmap.PortScanner()
    scan_results = {}   

    nm.scan(hosts='{}/{}'.format(host, subnet), arguments='-sP')

    hosts = nm.all_hosts()
    for ip in hosts:
        # Nmap scan does not grab information about the host itself but still appears on the list
        if ip != host:
            mac = nm[ip]['addresses']['mac']
            vendor = nm[ip]['vendor'][mac]
            scan_results[ip] = {'mac': mac, 'vendor': vendor, 'user': 'N/A', 'device': 'N/A'}
    print("Scan Results: \n")
    for ip in scan_results:
        print('ip: {}  mac: {}  vendor: {}'.format(ip, scan_results[ip]['mac'], scan_results[ip]['vendor']))

def print_err():
    print("Error, Please select a valid option")

def print_menu():
    print("\n1) Pulse Scan \n2) Manage Database \n3) Exit\n")

if __name__ == '__main__':
    # Check if DB exists else create DB    
    if path.exists('db.csv'):
        print("Loaded db.csv")
    else:
        with open('db.csv', 'w+') as f:
            f.write('ip, mac, vendor, user, description')
        print("No db file found, created db.csv")

    # Program Loop
    while 1:
        print_menu()
        choice = input("Selection: ")        
        if choice == '1':
            pulse_scan()
        elif choice == '2':
            print_err()
        elif choice == '3':
            sys.exit()
        else:
            print_err()