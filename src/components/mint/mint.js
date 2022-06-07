import React from 'react'
import Banner from './section/Banner'
import Upload from "./section/Upload"

export default function ArtistLaunchpad() {
    return (
        <div className="w-full flex flex-col mx-auto pb-6">
            <Banner />
            <Upload />
        </div>
    )
}
