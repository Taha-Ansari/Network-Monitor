const nmap = require('node-nmap');
nmap.nmapLocation = 'nmap';

class NetworkMonitor {    
    constructor(private host: string, private subnet: string){        
    }
    
    pulse_scan(){        
        let scan = new nmap.NmapScan(this.host + "/" + this.subnet, '-sP');
        scan.on('complete', function(data){
            console.log(data);
          });
        scan.on('error', function(error){
            console.log(error);
          });
        scan.start();
    }
    
    set set_host(ip:string){
        this.host = ip;
    }
    
    set set_subnet(subnet:string){
        this.subnet = subnet;
    }
    
    get get_device_data(){
        return JSON;
    }
}

let nm = new NetworkMonitor('192.168.2.114', '24');
nm.pulse_scan();