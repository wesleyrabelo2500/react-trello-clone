import React from 'react'
import Skeleton from 'react-loading-skeleton'
import PropTypes from 'prop-types'

export const BoardSkeleton = (props) => {
    return (
        <div className={`pt-16 py-4 px-3`}>
            <div className="flex mb-3 items-center text-xl">
                <Skeleton circle={true} height={30} width={30}></Skeleton>
                <Skeleton width={200} className="ml-5"></Skeleton>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {Array(props.count).fill(
                    <div className="rounded-md h-32">
                        <Skeleton height="8rem"></Skeleton>
                    </div>
                )}
            </div>
        </div>
    )
}

BoardSkeleton.propTypes = {
    count: PropTypes.number.isRequired
};