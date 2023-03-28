import React, { useEffect, useState } from 'react';

import JobTag from "./JobTag";
// import { searchFullText } from "../../../lib/operations"
import { useAppDispatch, useAppSelector } from '../../../app/reduxHooks';
import { getSearch } from '../finderSlice';
import { fetchFromDB } from '../../../lib/operations';

type CardType = {
    city: string
    company: CompanyType
    description: string
    end_date: string
    start_date: string
    location: Array<string>
    position: string
    scope: Array<string>
    tags: Array<string>
    user: UserType
}
type CompanyType = {
    creator: string,
    description: string,
    logo: string,
    name: string,
    url: string,
}
type UserType = {
    company: string
    email: string
    id: string
    photo: string
    type: string
    username: string
}


const JobCard = () => {

    const selectSearchTerm = useAppSelector(state => state.filter.searchTerm)


    const selectFilter = useAppSelector(state => state.filter.filters)
    const selectFilterObj: any = {}

    const selectFilter2 = selectFilter.forEach((cat) => {
        selectFilterObj[cat.name] = new Object({
            name: cat.name.toLowerCase(),
            items: cat.items.filter((item: any) => item.active).map((item: { tag: string }) => item.tag)
        })
    })






    console.log("selectfilterobj", selectFilterObj);

    const selectJobs = useAppSelector(state => state.finder.jobs)
    const selectFilteredJobs = useAppSelector(state => state.finder.filteredJobs)

    

    const dispatch = useAppDispatch()
    useEffect(() => {

        if (selectSearchTerm !== "") {
            // const {data, error, isLoading} = getSearch("hejsan")
            // const {data, error, isLoading} = useGetSearchQuery('asd')

            dispatch(getSearch(selectSearchTerm))


        } else {
            dispatch(getSearch(""))
        }
    }, [selectSearchTerm])

    useEffect(() => {


        const filteredTags = selectJobs.filter((job) =>
            job.tags.some((tag: any) => selectFilterObj.Tags.items.includes(tag)) && selectFilterObj.Cities.items.includes(job.city)
        );
/*         const filteredCities = filteredTags.filter((job) =>
            job.city == selectFilterObj.Cities.items.includes(job.city)
        ); */
/*         const filteredCities = selectJobs.filter((job) =>
  selectFilterObj.Cities.items.includes(job.city)
); */

        console.log("filtered tags", filteredTags)
        // console.log("filtered cities", filteredCities)
    }, [selectFilter])

    //dispatch(getSearch(""))
    //console.log(selectJobs);

    return (
        <div>
            {/* if filtered jobs */}
            {

                /* Logo, Company name, Job name, Tags, Description */
                selectJobs.map((card: CardType) => {

                    return (
                        <div key={selectJobs.indexOf(card)} className='bg-white p-3 rounded-lg m-auto mb-[20px] drop-shadow-md'>
                            <div className="card-header flex">
                                <img className='card-logo w-10' src={card.user.photo} alt={card.company.name + " logo"} />
                                {card.company.name}
                            </div>
                            <div className="card-desc">
                                {card.description}
                            </div>
                            <div className="card-city">
                                Based in: {card.city}
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
