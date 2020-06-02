# Network-Monitor
Private Network Monitor Application

Scans your private network to supply ipv4, mac address, and vendor information for active devices on the network.

## Instructions (Currently for Windows)

1. Install Nmap by downloading: https://nmap.org/dist/nmap-7.80-setup.exe
2. Make sure to include the path to nmap in env variables (Ex. I had to add 'C:\Program Files (x86)\Nmap' to my system variables)
3. Activate the virtual env: /venv/Scripts/activate
4. Install python modules: pip install -r requirements.txt
5. Run application: python main.py