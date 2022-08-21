# Remote Trainer 
[Website, try it out!](https://remotetrainer.live)

[Video Demo](https://www.youtube.com/watch?v=owxz8-TAM50)

## Inspiration

As college students, most of us do not have the time, money, or even motivation to go to the gym consistently. This web app was built to help students work out from the comfort of their room using what is available to them.

Furthermore, sometimes it feel like working out is doing nothing, and thus we lose motivation to continue working out. That's why we built a BMI and body fat tracker into our app. By providing a tangible display of improvement, it allows users maintain or even increase their motivation to continue working out.

## What it does

RemoteTrainer allows people to filter and search through the muscle groups they are trying to work out as well as the equipment they have, and after submitting that information, RemoteTrainer will show a list of exercises that the user can use. 

Moreoever, a gif is provided showing how to perform the exercise, as well as some small details about the exercise. 

The app will also keep track of the users BMI and body fat as the user keeps updating their information regarding age, height, weight, etc.

## How we built it

The front end was built using Next.js and the database and authentication was implemented using [Firebase Authentication](https://firebase.google.com/docs/auth) and [Firebase Firestore Realtime Database](https://firebase.google.com/docs/firestore).

Furthermore, we used [Material UI](https://mui.com/) as our front end library for easy to use components.

We used two seperate apis to [generate the exercises](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb/) and to [calculate BMI and Body Fat](https://rapidapi.com/malaaddincelik/api/fitness-calculator/). Axios was used to handle the API calls. 

Finally, the site was hosted on [Cloudflare](https://www.cloudflare.com/) which allows to encrypted traffic alongside ddos protection.

Last but not least, we were able to use Cloudflare to deploy on a custom domain from [Name.com](name.com).

## Challenges we ran into

One of the biggest challenges we ran into was having a few members not being able to work with us, so we had to redistribute tasks and plan accordingly.

Apart from that, that other major challenges we had was time management. This was due to using many new libraries and countless hours were spent pouring over documentation.

## Accomplishments that we're proud of

We were able to successfully make a website and deploy it. Furthermore, we were able to discover new components to build new tools.

An example would be the multiselect tool we used to select the equipment and body parts. We were able to filter the list based on a search bar and at the same time use checkboxes to select the entries we wanted. The selections were then combined and passed into an api to generate exercises. 

## What we learned

We learned a great deal about Material UI that we did not know before. The new styling options, themes, and components would be a great help in the future. 

Furthermore, over the course of this hackathon, we familarized ourselves with more firebase api and methods to handle asynchronus code. 

Apart from coding, we focused extensively on branches and pull requests. This allowed up more practice with dealing with merge conflicts and keeping a clean history of code.

## What's next for RemoteTrainer

There are many features to come for RemoteTrainer such as graphs for visualization with progress, as well as many convenience upgrades such as favoriting workouts, making playlists, streaks, and daily notifications.

Apart from feature updates, we also plan on making styling, security, and quality of life updates. 
