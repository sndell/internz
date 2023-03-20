import React from 'react';
import JobTag from "./JobTag";
import { fetchFromDB } from '../../../lib/operations';

type CardType = {
    companyName: string
    companyIcon: string
    title: string
    desc: string
    tags: Array<string>
}

/* const cards: Array<CardType> = [
    {
        companyName: "Google",
        companyIcon: "google.png",
        title: "Full Stack Developer",
        desc: "In this position you will be working with a senior FS developer",
        tags: ["Javascript", "React", "Firebase", "Chakra UI"],
    },
    {
        companyName: "Google",
        companyIcon: "google.png",
        title: "Full Stack Developer",
        desc: "In this position you will be working with a senior FS developer",
        tags: ["Javascript", "React", "Firebase", "Chakra UI"],
    },
    {
        companyName: "Google",
        companyIcon: "google.png",
        title: "Full Stack Developer",
        desc: "In this position you will be working with a senior FS developer",
        tags: ["Javascript", "React", "Firebase", "Chakra UI"],
    },
] */

const JobCard = () => {

    console.log(fetchFromDB())

    const cards: any  = fetchFromDB().then((listings: Array<any>) => {
        console.log(typeof(listings[0].companyName))
        return listings
    })

    console.log("cards", cards)


    return (
        <div>

            {
                /* Logo, Company name, Job name, Tags, Description */
                cards.map((card: CardType) => {

                    return (
                        <div key={cards.indexOf(card)} className='bg-white p-3 rounded-lg m-auto mb-[20px] drop-shadow-md'>
                            <div className="card-header flex">
                                <img className='card-logo w-10' src={card.companyIcon} alt={card.companyName + " logo"} />
                                {card.companyName}
                            </div>
                            <div className="card-desc">
                                {card.desc}
                            </div>
                            <ul className="card-tags flex">
                                {
                                    card.tags.map((tag) => {
                                        return (
                                            <JobTag
                                            tag={tag}
                                            key={card.tags.indexOf(tag)}
                                            />
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })

            }

        </div>
    );
};

export default JobCard;
