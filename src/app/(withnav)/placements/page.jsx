import React from 'react';
import PlacementIntro from '@/components/PlacementIntro';
import PlacementRecruiters from '@/components/PlacementRecruiters';
import PlacementStatus from '@/components/PlacementStatus';
import PlacementGraph from '@/components/PlacementGraph';
import Gallery from '@/components/Gallery';

const Placement = () => {
    return (
        <>
            <PlacementIntro />
            <PlacementRecruiters />
            <PlacementStatus />
            <PlacementGraph />
        </>
    );
};

export default Placement;
