/**
 *
 *      ioBroker Homematic Manager Adapter
 *
 *      Copyright (c) 2015 husky-koglhof<husky.koglhof@icloud.com>
 *
 *      [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/)
 *
 */
/* jshint -W097 */// jshint strict:false
/*jslint node: true */
"use strict";

var utils = require('@iobroker/adapter-core'); // Get common adapter utils

var adapter = utils.Adapter({
    name:  'hmm',
    unload: unloadHMM
});

var fs = require('fs');
var spawn =   require('child_process').spawn;
var Notify =  require('fs.notify');

adapter.on('message', function (obj) {
   if (obj) processMessage(obj);
       processMessages();
   });

adapter.on('ready', function () {
   main();
});

// is called if a subscribed state changes
//adapter.on('stateChange', function (id, state) {
//});
function unloadHMM(callback) {
    // Stop hmm
    stopping = true;
    if (HMMProcess) {
        adapter.log.info('kill hmm task');
        HMMProcess.kill();
        HMMProcess = null;
    }
    if (notifications) notifications.close();

    if (callback) callback();
}

function processMessage(obj) {
    if (!obj || !obj.command) return;

    switch (obj.command) {
        case 'update': {
        }
        case 'stopInstance': {
            unloadHMM();
        }
    }
}

function processMessages() {
    adapter.getMessage(function (err, obj) {
       if (obj) {
          processMessage(obj.command, obj.message);
          processMessages();
       }
    });
}

var HMMProcess;
var stopping;
var notifications;
var saveTimer;

function startHMM() {
    var args = [__dirname + '/node_modules/homematic-manager/main.js'];
    adapter.log.info('Starting homematic-manager: ' + args.join(' '));

    HMMProcess = spawn('node', args);
    HMMProcess.stdout.on('data', function (data) {
        if (!data) return;
        data = data.toString();
        if (data[data.length - 2] == '\r' && data[data.length - 1] == '\n') data = data.substring(0, data.length - 2);
        if (data[data.length - 2] == '\n' && data[data.length - 1] == '\r') data = data.substring(0, data.length - 2);
        if (data[data.length - 1] == '\r') data = data.substring(0, data.length - 1);

        if (data.indexOf("Error: ") != -1) {
            adapter.log.error(data);
        } else {
            adapter.log.debug(data);
        }
     });
     HMMProcess.stderr.on('data', function (data) {
         adapter.log.error(data);
     });

     HMMProcess.on('exit', function (exitCode) {
         adapter.log.info('hmm exited with ' + exitCode);
         HMMProcess = null;
         if (!stopping) {
             setTimeout(startHMM, 5000);
         }
     });
}

function writeSettings() {
    var daemons = {};
    var daemon = {};
    var output = {};

    if (adapter.config.devices) {
        for (var i = 0; i < adapter.config.devices.length; i++) {
            var name = adapter.config.devices[i].name;
            var type = adapter.config.devices[i].type;
            var ip = adapter.config.devices[i].ip;
            var port = adapter.config.devices[i].port;
            var isCcu = adapter.config.devices[i].isCcu;
            var init = adapter.config.devices[i].init;
            daemon["type"] = type;
            daemon["ip"] = ip;
            daemon["port"] = port;
            daemon["isCcu"] = isCcu;
            daemon["init"] = init;
            daemons[name] = JSON.parse(JSON.stringify(daemon));
        }
    }

    output["webServerPort"] = adapter.config.webServerPort;
    output["rpcListenIp"] = adapter.config.rpcListenIp;
    output["rpcListenPort"] = adapter.config.rpcListenPort;
    output["rpcListenPortBin"] = adapter.config.rpcListenPortBin;

    output["daemons"] = daemons;

    output["datastorePath"] = adapter.config.datastorePath;
    output["language"] = adapter.config.language;

    //fs.writeFileSync(__dirname + '/node_modules/homematic-manager/config.json', JSON.stringify(output));

    // Todo: Create $HOME/.hm-manager Directory und put Config into it
    var homedir = (process.platform === 'win32') ? process.env.USERPROFILE : process.env.HOME;
    var storePath = homedir+"/.hm-manager";

    if (!fs.existsSync(storePath)){
        fs.mkdirSync(storePath);
    }

    fs.writeFileSync(storePath+"/hm-manager.json", JSON.stringify(output));
}

function createTab() {
    /**
     <div id="tabs" style="display: none">
     <ul>
     <li><a href="#tab-adapters"     class="translate">Adapters</a></li>
     <li><a href="#tab-instances"    class="translate">Instances</a></li>
     **/


    // $("#tabs").append("Homematic-Manager");
    // $("#content").append("<p id='" + $(link).attr("rel") + "_content'>" + $(link).attr("title") + "</p>");

    /*
     if (id.match(/^system\.adapter\.node-red\.[0-9]+$/) && obj && obj.common && obj.common.enabled) {
        $("#a-tab-node-red").show();
        if ($('#tabs').tabs('option', 'active') == 5) $("#tab-node-red").show();
        $('#iframe-node-red').height($(window).height() - 55);
        $('#iframe-node-red').attr('src', 'http://' + location.hostname + ':' + obj.native.port);
     }
     */
}
function main() {
    // Create settings for hmm
    createTab();
    writeSettings();
    startHMM();
}
