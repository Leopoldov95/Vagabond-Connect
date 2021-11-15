import { Container, Typography } from "@material-ui/core";
import { findOne } from "../../testData/helper";

const SubComments = (props: any) => {
  return (
    <Container>
      {props.comments.map((comment: any) => (
        <div>
          {findOne(comment.owner)?.firstName}
          <Typography>{comment.message}</Typography>
        </div>
      ))}
    </Container>
  );
};

export default SubComments;
