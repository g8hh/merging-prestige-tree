let modInfo = {
	name: "A Prestige Tree Mod about Merging",
	id: "prestreemerge",
	author: "nobody",
	pointsName: "points",
	discordName: "APTMAM Discord",
	discordLink: "https://discord.gg/Uy7Y6VTdCR",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2.0",
	name: "It gets deep",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2.0</h3><br>
		- Added the Faster Auto-Merge and Even More Mergeables Gold Upgrades.<br>
		- Improved the design of Mergeables.<br>
		- Introduced the Auto-Worker, which can automatically produce Work.<br>
		- Introduced the Auto-Upgrader, which can automatically buy Merge Upgrades.<br>
		- Introduced Gilded Mergeables, which improve the level cap of the Better Mergeables Merge Upgrade.<br>
		- Better Mergeables cost now scales extremely fast above level 10.<br>
		- Optimized code length.<br>
	<h3>v0.1.2.1</h3><br>
		- You may now actually sell Better Mergeables.<br>
		- You can no longer sell the More Points Gold Upgrade.<br>
	<h3>v0.1.2</h3><br>
		- You may now sell Better Mergeables. You will not get any work from doing this.<br>
	<h3>v0.1.1</h3><br>
		- Gilded Circles are now, as intended, connected to the Merge layer.<br>
	<h3>v0.1.0</h3><br>
		- Introduced two upgrades, Better Mergeables and More Mergeables.<br>
		- Introduced the Auto-Buyer, which can automatically buy Mergeables.<br>
		- Introduced the Auto-Merger, which can automatically merge Mergeables.<br>
		- Introduced Gilded Points, which are a prestige layer. They have two upgrades which boost your game.<br>
		- Empty tiles now darken.<br>
	<h3>v0.0.1</h3><br>
		- Mergeables now highlight when selected.<br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

function getWorkEfficiency() {
  let effect = player.p.points.add(getResetGain("p")).max(1)
  effect = effect.cbrt()
  return effect
}

function getMergeableWorkBoosts() {
  let boost = layers.p.clickables[11].power()
  boost = boost.mul(layers.p.clickables[12].power())
  boost = boost.mul(layers.p.clickables[13].power())
  boost = boost.mul(layers.p.clickables[44].power())
  boost = boost.mul(layers.p.clickables[21].power())
  boost = boost.mul(layers.p.clickables[22].power())
  boost = boost.mul(layers.p.clickables[23].power())
  boost = boost.mul(layers.p.clickables[44].power())
  boost = boost.mul(layers.p.clickables[31].power())
  boost = boost.mul(layers.p.clickables[32].power())
  boost = boost.mul(layers.p.clickables[33].power())
  boost = boost.mul(layers.p.clickables[44].power())
  boost = boost.mul(layers.p.clickables[41].power())
  boost = boost.mul(layers.p.clickables[42].power())
  boost = boost.mul(layers.p.clickables[43].power())
  boost = boost.mul(layers.p.clickables[44].power())
  return boost
}

function getGMergeableCapBoosts() {
  let boost = layers.g.clickables[11].power().floor()
  boost = boost.add(layers.g.clickables[12].power().floor())
  boost = boost.add(layers.g.clickables[13].power().floor())
  boost = boost.add(layers.g.clickables[21].power().floor())
  boost = boost.add(layers.g.clickables[22].power().floor())
  boost = boost.add(layers.g.clickables[23].power().floor())
  boost = boost.add(layers.g.clickables[31].power().floor())
  boost = boost.add(layers.g.clickables[32].power().floor())
  boost = boost.add(layers.g.clickables[33].power().floor())
  return boost
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
  gain = gain.div(getWorkEfficiency())
  gain = gain.mul(getMergeableWorkBoosts())
  gain = gain.mul(buyableEffect("g", 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
  automation: {
    p: {
        autoBuyerOn: false,
        autoMergeOn: false,
        autoUpgradeOn: false,
        autoWorkOn: false,
    }
  }
}}

// Display extra things at the top of the page
var displayThings = [
  function() {return "Your current and potential work is dividing your point gain by "+format(getWorkEfficiency())+"."},
  function() {if (getMergeableWorkBoosts().gt(1)) return "Your mergers are multiplying points by "+format(getMergeableWorkBoosts())+"."}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
