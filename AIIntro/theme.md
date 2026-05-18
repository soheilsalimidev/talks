theme 1
```html
<div flex flex-col gap3 h-full>
<div v-click="1" bg-blue:10 border="~ gray/50 rounded-lg">
  <div flex="~ items-center gap-2" bg-blue:10 px4 py2 rounded><div  i-solar-usb-square-broken text-xl invert-100 text-blue-4 /> USB Drive-by</div>

  <div ml2 p2 text-gray1>
  <v-clicks :at="2">

Insert a malicious USB drive into the air-gapped computer, which can install malware or exfiltrate data.
  </v-clicks>
  </div>
</div>

<div v-click="3" bg-gray:10 border="~ gray/50 rounded-lg">
  <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded><div  i-solar:telescope-broken text-xl invert-100 text-blue-4 /> Use a telescope to see the monitor </div>

  <div ml2 p2 text-gray1>
  <v-clicks :at="4">
<img h-40  src="/1.png"/>
  </v-clicks>
  </div>
</div>
</div>

```
theme 2
```html
# Attacks on Air-Gapped Networks

<div flex="~ col gap-4" py6>
<span v-click>
  <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Send the malware</div><br>
  <span text-blue2> Involve specialized malware and physical media or insider agents</span>
</span>
<span v-click>
  <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>collecting Data</div><br>
  <span text-rose2>Initiate malware execution, propagate within the network, and exfiltrate data</span>
</span>
<span v-click>
  <div flex="~ inline" text-yellow mr2 px2 rounded bg-yellow:10>Try to send Data</div><br>
  <span text-yellow2>Wait for another usb connection to copy files into</span>
</span>
<span v-click>
  <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Apps we can use</div><br>
  <span text-green2>Examples of APTs that have targeted air-gapped networks: USBStealer, Agent.BTZ, Stuxnet, etc.</span>
</span>
</div>

```

