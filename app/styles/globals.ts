const cardStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 1,
  };

const contentStyle = {
display: 'flex',
flexDirection: 'column',
gap: '1rem',
};

const actionStyle = {
display: 'flex',
justifyContent: 'flex-end',
p: 2,
};

export { cardStyle, contentStyle, actionStyle };