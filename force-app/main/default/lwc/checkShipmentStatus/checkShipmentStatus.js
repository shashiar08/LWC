import { LightningElement, api, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getShipmentStatus from '@salesforce/apex/ShipmentController.getShipmentStatus';

export default class CheckShipmentStatus extends LightningElement {
    @api recordId;
    @track status;


    connectedCallback() {
        getShipmentStatus({
            shipmentRecordId : this.recordId
        })
        .then(result => {
			this.status = result;
		})
		.catch(error => {
			this.error = error;
			const event = new ShowToastEvent({
                title: 'Error',
                message: 'An error occured while fetching shipment status. Please try again',
                variant: 'error',
                mode: 'dismissible'
            });
            this.dispatchEvent(event);
		})
    }
}