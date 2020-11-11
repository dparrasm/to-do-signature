import React, { Component, Suspense} from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';


const styles = withStyles(theme => (
    {
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        pink: {
            color: theme.palette.getContrastText('#ddd'),
            backgroundColor: '#ddd',
        },
        green: {
            color: '#fff',
            backgroundColor: '#ccc',
        },
    }),
);

export interface IconAvatarProps {
    classes?: any;
    IconName: string; 
}

class IconAvatar extends Component<IconAvatarProps, any>{

    constructor(props: IconAvatarProps) {
        super(props);
    }

    render() {
        const { classes , IconName } = this.props;
        const Icon = React.lazy(() => import(`@material-ui/icons/${IconName}`));    
        
        return (
            
            <Avatar>
                <Suspense fallback={<div/>}>
                <Icon/>
                </Suspense>
            </Avatar>
            
        );
    }
}

export default IconAvatar;