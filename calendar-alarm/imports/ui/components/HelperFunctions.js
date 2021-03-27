const HelperFunctions = () => {
    function allStorage() {
        var archive = {}, // Notice change here
            keys = Object.keys(localStorage);
            i = keys.length;

        while ( i-- ) {
            archive[ keys[i] ] = localStorage.getItem( keys[i] );
        }

        return archive;
    };
}
export default HelperFunctions
