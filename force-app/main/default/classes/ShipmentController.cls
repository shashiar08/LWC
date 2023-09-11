public class ShipmentController {
    public class ShipmentControllerException extends Exception{}
    @AuraEnabled
    public static string getShipmentStatus(String shipmentRecordId){
        String status = '';
        Shipment shipment = [SELECT Id, TrackingNumber	From Shipment Where Id =: shipmentRecordId];
        if(String.isNotBlank(shipment.TrackingNumber)){
            HttpRequest httpRequest = new HttpRequest();  
            httpRequest.setEndpoint('https://merzcommunities--mel.sandbox.my.salesforce-sites.com/services/apexrest/mockShipmentStatus?trackingNumber=' + shipment.TrackingNumber);
            httpRequest.setMethod('GET');
            Http http = new Http();   
            HttpResponse httpResponse = http.send(httpRequest);  
            if (httpResponse.getStatusCode() == 200 ) {  
               status = httpResponse.getBody();
            } 
            else {  

                throw new ShipmentControllerException('Unable to get the current shipment status.');  
            }
        } else{
            throw new ShipmentControllerException('Tracking number does not exist.');
        }
        return status;
    }
}