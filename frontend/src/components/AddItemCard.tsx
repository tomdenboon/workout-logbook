import { Add } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';

interface AddItemCardProps {
  onClick: () => void;
}

function AddItemCard(props: AddItemCardProps) {
  const { onClick } = props;

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => onClick()}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
            <Add color="primary" />
            <Typography color="primary">Click to add new template</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AddItemCard;
