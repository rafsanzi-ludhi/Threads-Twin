"use client";   

interface Props { //defining props type as an interface
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
    return (
        <div>
            Account Profile
        </div>
    )
}

export default AccountProfile; 