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

			const event = new ShowToastEvent({
                title: 'Error',
                message: error.body && error.body.message ? error.body.message : 'There is an error while getting status. Please reload the page',
                variant: 'error',
                mode: 'dismissible'
            });
            this.dispatchEvent(event);
		})
    }
}