## Inspiration

As we know, at the core of Web3 is the community. Whether that’s with NFT Collections, DeFi protocols, or DAOs. While users enjoy the services provided by the projects, and projects in turn rely on a high-engaged community to further grow and help decide on the future of the project.

But these communities have problems keeping their members engaged in a sustainable manner. The current playbook of whitelisting “early participants” and “active community members” for exclusive free drops or pre-sales is no longer effective. Communities often lose out on those early engagers who’ve moved onto the next shiny new project offering shinier promises.

So the question is “How can we keep community members engaged in a sustainable, long-term manner?” Is there a way not only to track engagement of members in your community but also, by doing so, incentivize and reward such engagement?

## What it does

This is where Community NFTs come into play. Imagine every web3 community issuing a soul-bound NFT to their community members that track both their on- and off-chain contributions to the community. And by doing so, easily visualizing their activity, comparing that with others, and in turn incentivizing users to further contribute to the community.

And this is exactly why we’ve built Credly. A Community NFT as a Service platform that allows web3 communities to seamlessly launch soul-bound NFTs for their community members.

## How we built it

###

This project was built with NextJS, Express, Render Web Services and powered by IPFS (Fleek, NFT.Storage, Web3.Storage).

### Frontend

The client side is written in Typescript and built with NextJS and Chakra UI. On the client side, a user can build their community NFT artwork and deploy the NFT collection. The frontend also has a custom minting page for each community to use for minting. All the data ultimately hosted on IPFS via NFT.Storage as the metadata for the collection. The website is hosted on IPFS via Fleek.

### Backend

The backend has two parts: (1) a hosted web service is written in Javascript that uses Express routes to handle requests from the frontend. (2) a hosted cron job that polls for user interactions both on-chain and off-chain using Etherscan API, Discord API, Twitter, API, and Github API. The backend handles deployment of contract and updating of NFT stats on-demand with cron jobs.

### Contract

The NFT Collection Contract is a standard [NFT contract](https://github.com/iamminci/credly-server/blob/main/contracts/nft.sol) with my own custom logic added to issue soul-bound tokens (i.e. non-transferrable tokens). The contract also handles token metadata by saving a tokenURI for each individual minter, not using the standard aggregate baseURI methodology. All metadata is hosted on IPFS via NFT.Storage.

## Challenges we ran into

### Handling Dynamic NFTs

There's currently no established way of building dynamic NFT's in the industry at the moment. As a result, I had to come up with my own novel centralized off-chain solution (which involved hosted event listeners and cron jobs) to update the on-chain NFT stats based on user interactions. This also involved on-demand image construction with `node-canvas` and hosting on NFT.Storage while moving away from the industry standard of handling token metadata (updating a single `baseURI` on the NFT collection that routes to various `tokenURI`s) and saving a unique URI for each user and updating those individually on-demand).

### On-Demand NFT Deployment

Learning how to programmatically deploy NFT collections on-demand and providing communities a tailored page to mint these NFTs was another challenge I had to overcome. The solution was rather simple, hooking up Hardhat deployment scripts to an API endpoint deployed with Express and sending the necessary parameters in the POST request for that collection.

### Lack of Testing

I joined the hackathon in August, so due to the lack of time, I had to pour my efforts into ideation, design, building UX/UI + backend, demo, instead of writing tests. Had I had another couple weeks, having the space to write reliable tests would have helped mitigate a lot of challenges that ensued. But again, this is a hackathon submission so it's understandable.

### Time and Role Management

There's a huge leap from building a proof of concept geared towards a single demo video and building a prototype that actually works. By pursuing the latter as a solo hacker, I learned the challenges of prioritization and effort estimation (frequently being too optimistic about my own deadlines), while juggling the roles of product manager, designer, fullstack engineer, solidity engineer, and marketer. It was truly a taxing project that challenged me in all directions but I learned a lot about myself through the journey.

## Accomplishments that we're proud of

I'm proud of simply having the MVP service up and running. It was a long journey, I'll tell you that.

## What we learned

When doing user research, I learned that this is a market with a huge demand. Not only web3 projects but a lot of traditional companies that are interested in getting into web3 have demonstrated their wanting of a service that can aggregate both on- and off-chain community data and quantify them into a single, issuable credential. I am very excited to continue building this service out and onboarding more engineers to help me build the vision.

Personally, there's a huge leap from building a proof of concept geared towards a single demo video and building a prototype that actually works. By pursuing the latter as a solo hacker, I learned the challenges of prioritization and effort estimation (frequently being too optimistic about my own deadlines), while juggling the roles of product manager, UX/UI designer, fullstack engineer, solidity engineer, and marketer. It was truly a taxing project that challenged me in all directions but I learned a lot about myself through the journey.

## What's next for Credly

This was a proof of concept built in the span of two weeks. But I am interested in continuing to pursue this project. My next steps will be as follows:

- More metrics for XP and customized algorithms to make metrics more mathematically rigorous:
- Adding Retroactive contributions (pre-NFT contributions)
- Disincentivize disengagement (degrade stats over time if inactive)
- Better responsive UI support
- Testing and monitoring of service

I’m really excited to see a future where many web3 communities issue their members an exciting community NFT to not only track their engagement on-chain but also incentivize their contribution. Level up your community’s engagement with Credly. Thanks for tuning in.

Landing page for Credly.
Page to build your own custom community NFT.
Page for community members to mint the deployed NFT.
Dashboard page for community admin to track minting progress.
Leaderboard for community admin to track most engaged members.
