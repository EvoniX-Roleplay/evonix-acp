import React, { useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';
import { Modal, Button, Image, Header, Divider, Label } from 'semantic-ui-react';

import UserAppsContext from '../../../context/userapps/userAppsContext';

import Loader from '../../layouts/loader/Loader';

const UserApps = () => {
    const userAppsContext = useContext(UserAppsContext);
    const { user_apps, getAllUserApps, setLoading } = userAppsContext;

    useEffect(() => {
        getAllUserApps();
        // eslint-disable-next-line
    },[])

    const columns = [
        {
            name: 'User',
            sortable: true,
            cell: row => <div>{row.userAppUser.name}</div>
        },
        {
            name: 'Score',
            selector: 'score',
            sortable: true
        },
        {
            name: 'Application',
            cell: row => <div>
                            <Modal trigger={<Button size="small">View</Button>}>
                                <Modal.Header>{row.userAppUser.name}'s Application</Modal.Header>
                                <Modal.Content image>
                                    <Image wrapped size="huge" src={row.userAppQuiz.image} />
                                    <Modal.Description>
                                        <Header>{row.userAppQuiz.title}</Header>
                                        <p style={{ textAlign: 'justify' }}>
                                            {row.userAppQuiz.question}
                                        </p>
                                        <Divider />
                                        <Header as="h3">The Answer</Header>
                                        <p style={{ textAlign: 'justify' }}>
                                            {row.answer}
                                        </p>
                                    </Modal.Description>
                                </Modal.Content>
                            </Modal>
                        </div>
        },
        {
            name: 'Status',
            sortable: true,
            cell: row => <div>{row.userAppUser.status === 1 ? (<Label color="yellow">Pending</Label>) : 
                row.userAppUser.status === 2 ? (<Label color="red">Denied</Label>) : (<Label color="green">Approved</Label>)}</div>
        },
        {
            name: 'Approved by',
            cell: row => <div>{row.admin_id ? row.userAppAdmin.name : 'Nobody'}</div>
        },
        {
            name: 'Created at',
            cell: row => <div><Moment unix format="llll">{row.created_at}</Moment></div>
        },
        {
            name: 'Updated at',
            cell: row => <div>{row.updated_at !== null ? (<Moment unix format="llll">{row.updated_at}</Moment>) : 'No update'}</div>
        }
        // {
        //     name: 'Action',
        //     cell: row => <Button.Group size="small">
        //                     {row.userAppUser.status !== 3 && (
        //                         <Button
        //                             icon="checkmark"
        //                             color="green"
        //                             onClick={onApprove(row.id, row.user_id)}
        //                         />
        //                     )}
        //                     {row.userAppUser.status !== 2 && (
        //                         <Button
        //                             icon="delete"
        //                             color="red"
        //                             onClick={onDeny(row.id, row.user_id)}
        //                         />
        //                     )}
        //                 </Button.Group>
        // }
    ];

    // const onApprove = (id, userid) => updateUserApps(1, id, userid);
    // const onDeny = (id, userid) => updateUserApps(0, id, userid);

    return (
        <>
            {user_apps !== null && user_apps.length === 0 && !setLoading && (
                <Image src="https://media.giphy.com/media/giXLnhxp60zEEIkq8K/giphy-downsized.gif" centered />
            )}
            {user_apps !== null && !setLoading ? (
                <DataTable
                    title="User Applications"
                    columns={columns}
                    data={user_apps}
                    pagination
                    highlightOnHover
                />
            ) : (
                <Loader isLoading={setLoading} />
            )}
        </>
    )
}

export default UserApps;
