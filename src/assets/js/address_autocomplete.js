// This sample uses the Autocomplete widget to help the user select a
// place, then it retrieves the address components associated with that
// place, and then it populates the form fields with those details.
// This sample requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script
// src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeSearch, patientAddress, physicianAddress;

function initAutocomplete() {
    // Create the autocomplete object, restricting the search predictions to
    // geographical location types.
    patientAddress = new google.maps.places.Autocomplete(
        document.getElementById('address'), {types: ['geocode']});

    physicianAddress = new google.maps.places.Autocomplete(
        document.getElementById('doctor-address'), {types: ['geocode']});

    pcpAddress = new google.maps.places.Autocomplete(
        document.getElementById('pcp-address'), {types: ['geocode']});

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    patientAddress.setFields(['address_component']);
    physicianAddress.setFields(['address_component']);
    pcpAddress.setFields(['address_component']);

    // When the user selects an address from the drop-down, populate the
    // address fields in the form.
    patientAddress.addListener('place_changed', fillInPatientAddress);
    physicianAddress.addListener('place_changed', fillInPhysicianAddress);
    pcpAddress.addListener('place_changed', fillInPcpAddress);

    // restrict the country to us
    patientAddress.setComponentRestrictions(
        {'country': ['us']});
    physicianAddress.setComponentRestrictions(
        {'country': ['us']});
    pcpAddress.setComponentRestrictions(
        {'country': ['us']});
}

function fillInPatientAddress() {
    // Get the place details from the autocomplete object.
    var place = patientAddress.getPlace();

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        var shortName = place.address_components[i]['short_name'];
        var longName = place.address_components[i]['long_name'];
        switch(addressType) {
            case "street_number":
                $('#address').val(shortName);
            break;
            case "route":
                var address_num = $('#address').val();
                $('#address').val(address_num + ' ' + shortName);
            break;
            case "locality":
                $('#city').val(longName);
            break;
            case "administrative_area_level_2":
                $('#county').val(longName);
            break;
            case "administrative_area_level_1":
                $('#state').val(shortName);
            break;
            case "postal_code":
                $('#zip-code').val(shortName);
            break;
            default:
                // do nothing
            break;
        }
    }
}

function fillInPhysicianAddress() {
    // Get the place details from the autocomplete object.
    var place = physicianAddress.getPlace();

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        var shortName = place.address_components[i]['short_name'];
        var longName = place.address_components[i]['long_name'];
        switch(addressType) {
            case "street_number":
                $('#doctor-address').val(shortName);
            break;
            case "route":
                var address_num = $('#doctor-address').val();
                $('#doctor-address').val(address_num + ' ' + shortName);
            break;
            case "locality":
                $('#doctor-city').val(longName);
            break;
            case "administrative_area_level_1":
                $('#doctor-state').val(shortName);
            break;
            case "postal_code":
                $('#doctor-zip-code').val(shortName);
            break;
            default:
                // do nothing
            break;
        }
    }
}

function fillInPcpAddress() {
    // Get the place details from the autocomplete object.
    var place = pcpAddress.getPlace();

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        var shortName = place.address_components[i]['short_name'];
        var longName = place.address_components[i]['long_name'];
        switch(addressType) {
            case "street_number":
                $('#pcp-address').val(shortName);
            break;
            case "route":
                var address_num = $('#pcp-address').val();
                $('#pcp-address').val(address_num + ' ' + shortName);
            break;
            case "locality":
                $('#pcp-city').val(longName);
            break;
            case "administrative_area_level_1":
                $('#pcp-state').val(shortName);
            break;
            case "postal_code":
                $('#pcp-zip-code').val(shortName);
            break;
            default:
                // do nothing
            break;
        }
    }
}
