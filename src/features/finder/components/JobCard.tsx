import React from "react";
import JobTag from "./JobTag";
import { useAppDispatch } from "../../../app/reduxHooks";
import { loadJobs } from "../finderSlice";
import { fetchFromDB } from "../../../lib/operations";
import { useAppSelector } from "../../../app/reduxHooks";
import { useEffect } from "react";

type CardType = {
  companyName: string;
  companyIcon: string;
  title: string;
  desc: string;
  tags: Array<string>;
};

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
  const filterArray = useAppSelector((state) => {
    return state.filter.filters
      .flatMap((category) => [...category.items])
      .filter((tag: { active: boolean }) => tag.active === true);
    //   .reduce((acc, curItem) => acc + (curItem.active ? 1 : 0), 0);
  });

  console.log(filterArray);

  const dispatch = useAppDispatch();

  const cardsData = useAppSelector((state) => state.finder.jobs);

  const cards = () =>
    fetchFromDB(filterArray)
      .then((listings: Array<any>) => {
        console.log(listings);
        return listings;
      })
      .then((listings) => {
        dispatch(loadJobs(listings));
      });

  /* useEffect(() => {
    cards();
  }, [filterArray]); */

  /* const loadJobs = () => {
        dispatch(loadJobs(cards))
    } */

  ///////// Anpassa till ny databas namn /////////
  return (
    <div>
        <button onClick={cards}>Loads cards🍆</button>
      {
        /* Logo, Company name, Job name, Tags, Description */
        cardsData.map((card: CardType) => {
          return (
            <div
              key={cardsData.indexOf(card)}
              className="m-auto mb-[20px] rounded-lg bg-white p-3 drop-shadow-md"
            >
              <div className="card-header flex">
                <img
                  className="card-logo w-10"
                  src={card.companyIcon}
                  alt={card.companyName + " logo"}
                />
                {card.companyName}
              </div>
              <div className="card-desc">{card.desc}</div>
              <ul className="card-tags flex">
                {card.tags.map((tag) => {
                  return <JobTag tag={tag} key={card.tags.indexOf(tag)} />;
                })}
              </ul>
            </div>
          );
        })
      }
    </div>
  );
};

export default JobCard;
