import set_userRouter from './routers/sample.route';

function init(app: any) {
    app.use('/sample', set_userRouter);
}

module.exports = {
    init
};
