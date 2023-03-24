import React, { useEffect, useState } from 'react';
import JobTag from "./JobTag";
import { searchFullText } from "../../../lib/operations"
import { useAppDispatch, useAppSelector } from '../../../app/reduxHooks';
import { loadJobs } from '../finderSlice';

type CardType = {
    companyName: string
    companyIcon: string
    title: string
    desc: string
    tags: Array<string>
}


const JobCard = () => {
    
    const selectSearchTerm = useAppSelector(state => state.filter.searchTerm)
    const selectJobs = useAppSelector(state => state.finder.jobs)
    const dispatch = useAppDispatch()
    useEffect(() => {

        if (selectSearchTerm !== "") {
            const searchResult = searchFullText(selectSearchTerm)
            dispatch(loadJobs(searchResult))
            
        }
    }, [selectSearchTerm])
    
    console.log(selectJobs);
    
    return (
        <div>

            {
                
                /* Logo, Company name, Job name, Tags, Description */
                selectJobs.map((card: CardType) => {

                    return (
                        <div key={selectJobs.indexOf(card)} className='bg-white p-3 rounded-lg m-auto mb-[20px] drop-shadow-md'>
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
