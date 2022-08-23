# frpg-extention
An extension for Farm RPG to add some more features to the game. It is written in JavaScript and can be used with any userscript manager like Tampermonkey or Greasemonkey for example.

## Download via Tampermonkey
First of all you need of course Tampermonkey to be installed as a browser extension. Therefore just search for it in your browsers extension/add-ons menu and hit the install button. For more detailed instructions visit this website: https://www.tampermonkey.net/

After you successfully installed the browser extension you need to copy the link to the "raw" main.js file of this repository: https://raw.githubusercontent.com/war0/frpg-extention/main/main.js
Next step is to open up Tampermonkey and create a new userscript. You don't really need to type anything in there, just hit save and it should allow you to go to the settings tab. Paste the already copied URL into the update URL field and make sure you also enable updates via activating the checkbox. Hit save and you are almost done. The only thing left is that you go back to usercript overview (installed userscripts), mark your new script and choose to update marked scripts. This should import this FRPG extension and also rename the script for you. 
Make sure you periodically update the script to always have the newest version installed.  
![image](https://user-images.githubusercontent.com/35682065/186091254-aa750470-f702-4e63-b93d-5f6cafa774ce.png)  

## localStorage
Technically the settings you make are saved in the localStorage of your browser. I don't have access to any FRPG account settings so there is no way to share anything across devices or browsers, if you are using multiple.
  
## Feature #1 - Chat Customizing
There are some settings available to make the chat look more like you want.
![image](https://user-images.githubusercontent.com/35682065/186082040-85850940-fc4e-4c17-9f63-d569a868cb83.png)  
The activated "Highlight trades" checkbox will show "selling ..." and "buying ..." messages in green and red boxes, switch the font to bold and change the font colors as well. The other settings should be self explanatory most of the time. If not than just play around with them and see what happens :)   
You always have to hit the "Save & Reload" button to let your changes take effect, except when you want to reset your settings completely. The "Reset to default" button does exactly that and it does it immediately, it will reload the page automatically.
