//NOTE: THE GAME OVER SCREEN SEEMS TO BE BUGGED BUT THE ALLY TOOL PATH WORKS JUST FINE. WILL FIX EVENTUALLY

let detectlimit = 0;
let duoadvice = 0;
let duoquestion = 0;
let roulette = Math.floor(Math.random() * 11);
class Start extends Scene {
    create() {
        //console.log(this.engine.storyData)
        //console.log(this.engine.storyData.SecondLocations.Advice.Choices[duoquestion].Target);

        //const key = "Kresge"
        //console.log(this.engine.storyData.Locations[key].Body)
        
        
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }  
        } else if (locationData.Body = "You take the risk and call your friend. Luckily they are skilled enough to cover your quick conversation. You now have someone who can help you during the quiz.") {
            this.engine.addChoice("Begin the game with an ally.")
        } else {
            this.engine.addChoice("The end.");
        } 
    }

    
    handleChoice(choice) {
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
            console.log(choice.Text);
        } else if (choice = 'Begin the game with an ally'){
            this.engine.gotoScene(SecondLocation, this.engine.storyData.SecondInitialLocation);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class SecondLocation extends Scene {
    create(key) {
        let secondlocationData = this.engine.storyData.SecondLocations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(secondlocationData.Body); // TODO: replace this text by the Body of the location data
        if(secondlocationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of secondlocationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            } 
            //console.log(duoquestion);
        } else if (secondlocationData.Body == "Gamble your chances with the program your friend gave you.") {
            this.engine.addChoice("Roll the die, baby!");
        } else {
            this.engine.gotoScene(End);
        } 
    }

    
    handleChoice(choice) {
        if (detectlimit > 1){
            this.engine.show("&gt; "+ "CAUGHT YOU, COWARDLY CHEATER!");
            this.engine.gotoScene(End);
        }
        else if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(SecondLocation, choice.Target);
            duoadvice += 4;
            console.log(duoadvice);
        } else if (choice = "Roll the die, baby!"){ 
            detectlimit += 1;
            duoadvice += 1;
            this.engine.show("&gt; "+ this.engine.storyData.SecondLocations.Advice.Choices[duoadvice % roulette].Text);
            this.engine.gotoScene(SecondLocation, this.engine.storyData.SecondLocations.Advice.Choices[duoadvice % roulette].Target); 
        

        } else {
            this.engine.gotoScene(End);
        }
    }
}



class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');