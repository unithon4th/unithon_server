/**
 * Created by yuhogyun on 2017. 2. 4..
 */

/** External dependencies **/

/** Internal dependencies **/
import MailController from './../controller/mailController';

const MailRouter = {
    send(req, res) {
        let email = req.body.email;
        MailController.sendMail(email).then(() => {
            res.status(200).json({res: 'success'});
        }).catch((err) => {
            res.status(500).json({res: err});
        });
    },
};

export default MailRouter;
