(async function main() {
    const localVideo = document.getElementById('js-local-stream');
    const joinTrigger = document.getElementById('js-join-trigger');
    // const joinTrigger = document.getElementsByTagName('html')
    const leaveTrigger = document.getElementById('js-leave-trigger');
    const remoteVideos = document.getElementById('js-remote-streams');
    // const roomId = document.getElementById('js-room-id');


    const localText = document.getElementById('js-local-text');
    const sendTrigger = document.getElementById('js-send-trigger');
    const messages = document.getElementById('js-messages');

    // Register join handler
    /***** ADD *****/
    window.addEventListener('DOMContentLoaded', () => {

        // window.onload = function () {
        // joinTrigger.addEventListener('load', () => {
        // joinTrigger.addEventListener('click', () => {
        // const roomId = document.getElementById("js-room-id").value;
        // const roomId = $('.ui.fluid.dropdown.selection').dropdown('get value');
        const roomId = "test"
        console.log(roomId + "が入りました。")
    });
    // }
    /***** ADD *****/

})();