import set_userRouter from './routers/sampleRouter';

function init(app: any) {
    app.use('/sample', set_userRouter);
}

module.exports = {
    init
};
