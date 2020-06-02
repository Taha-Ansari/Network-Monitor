#!/usr/bin/python
import nmap

nm = nmap.PortScanner()
scan_results = {}
host = input("Enter IP: ") or "192.168.2.114"
subnet = input("Enter Subnet: ") or "24"

nm.scan(hosts='{}/{}'.format(host, subnet), arguments='-sP')

hosts = nm.all_hosts()
for ip in hosts:
    if ip != host:
        mac = nm[ip]['addresses']['mac']
        vendor = nm[ip]['vendor'][mac]
        scan_results[ip] = {'mac': mac, 'vendor': vendor, 'user': 'N/A', 'device': 'N/A'}

for ip in scan_results:
    print('ip: {}  mac: {}  vendor: {}'.format(ip, scan_results[ip]['mac'], scan_results[ip]['vendor']))