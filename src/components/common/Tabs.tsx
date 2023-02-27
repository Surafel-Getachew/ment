import { FC, ReactNode, useState } from 'react';
import {
  Box, makeStyles, createStyles, Theme, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
  tab: {
    cursor: 'pointer',
  },
  selected: {
    borderBottom: `5px solid ${theme.palette.primary.main}`,
    cursor: 'pointer',
  },
}));

type TabsProps = {
  navItems: string[];
  contentItems: ReactNode[],
  selected: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'
};

// TODO move this to a utility
type MUVariant = 'overline' | 'caption' | 'subtitle1' | 'h5' | 'h4' | 'h1' | 'h2' | 'h3' | 'h6' | 'subtitle2' | 'body1' | 'body2' | 'srOnly';

const sizeToVariant: Map<string, MUVariant> = new Map();
sizeToVariant.set('sm', 'caption');
sizeToVariant.set('md', 'subtitle1');
sizeToVariant.set('lg', 'h5');
sizeToVariant.set('xl', 'h4');

const Tabs: FC<TabsProps> = ({
  navItems,
  contentItems,
  selected,
  size,
}) => {
  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = useState(navItems.indexOf(selected));

  const renderTabs = () => navItems.map((navItem, index) => {
    const isSelected = index === selectedIndex;
    const tabStyle = isSelected ? classes.selected : classes.tab;

    const onClick = () => {
      setSelectedIndex(index);
    };
    const variant = size ? sizeToVariant.get(size) || 'subtitle1' : 'subtitle1';
    return (
      <Box display="inline" fontWeight={600} className={tabStyle} mr={3} color="primary.main" onClick={onClick}>
        <Typography color="textPrimary" variant={variant}>{navItem}</Typography>
      </Box>
    );
  });

  const renderContent = () => {
    if (selectedIndex < 0) {
      return <Typography>No Tab Selected</Typography>;
    }

    return (
      <Box>
        {contentItems[selectedIndex]}
      </Box>
    );
  };

  return (
    <Box height="100%">
      <Box display="flex" mb={{ xs: 3, md: 5 }}>
        {renderTabs()}
      </Box>
      {renderContent()}
    </Box>
  );
};
export default Tabs;
