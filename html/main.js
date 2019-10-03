$(document).ready(function() {
    $('#searchDestinations').click(function() {
        console.log($('#latitude').val())
        axios({
            method: 'post',
            url: '/destinations',
            data: {
                latitude: parseFloat($('#latitude').val()),
                longitude: parseFloat($('#longitude').val())
            },
            headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            var destination_string = ''
            console.log(response.data)
            response.data.points.forEach(point => {
                destination_string = destination_string + '<span>' + point._id + '</span>'
            })

            $('#destinations').html(destination_string)

        });
    })
})