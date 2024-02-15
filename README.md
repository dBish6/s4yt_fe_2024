# s4yt_fe_2024
Welcome to the special event/'game' front-end repository for Building-u, called Dollars for Your Thoughts ($4YT). The project is for the interns from Building-u. The point system is a focal point, players can earn `Dubl-u-nes` and spend them on the raffle items provided by the raffle partners and even complete a business challenge for real cash. They can also, view sponsors and complete the sponsor quiz for additional coins. The winners of the businesses challenges and raffle items are also shown at the end of the event on the Event Results page. The application is also controlled by roles of the user and the timestamps for each period of the event, which are shown below.

## Please Note ⚠
Due to time constraints, our back-end developer leaving, and other commitments, we had to **improvise** in certain areas. This is why you'll see `Firebase` being used for the business's meet-ups and challenges. Hardcoded data is also around for some data, which is located at `src/constants/temporaryDb`. These were last-minute solutions that we had no other choice but to do.

## Timestamps
The state for the timestamps is located in `src/redux/reducers/gameConfig.ts`.

- `register_start:` **restrictedAccess** is set and they are only allowed to the profile.
- `game_start` the 'game' has started everyone is **allowed everywhere** except for the **Event Results page**.
- `review_start` **challenge submissions** and the **raffle** are now in review and the **game is closed**, but only for the **player role**.
- `review_end` winners are now shown and everyone can only access the **Event Results page** with the **Proile page** as an exception.
- `game_end` end of the 'game' and the **Game Closed page** is always shown after login.

## Tech Used

## Folder Structure
To maintain good development practices and consistency across files/folders, we recommend using the same guidelines and structure as follows if you're building upon the code. In this project we used a reusable architecture for all folders, so create a new `component` only if it is used in more than one file, the same goes for `utils`, `constants`, and the other folders.

## Getting Started

## License
