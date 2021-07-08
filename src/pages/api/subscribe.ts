import { postSubscribeCustomer }  from "server/controllers/subscribe";
import { mapHandlerByMethod, withSession } from "server/lib/request";


export default withSession(
  mapHandlerByMethod({
    POST: postSubscribeCustomer,
  })
);

