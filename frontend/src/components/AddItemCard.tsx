import { Add } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';

interface AddItemCardProps {
  onClick: () => void;
  item: string;
}

function AddItemCard(props: AddItemCardProps) {
  const { item, onClick } = props;

  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => onClick()}>
        <CardContent>
          <Stack direction="row" alignItems="center" justifyContent="center" gap={2}>
            <Add color="primary" />
            <Typography color="primary">Click to add new {item}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default AddItemCard;
