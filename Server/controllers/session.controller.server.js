
module.exports = (app) => {

    function setSession(req, res) {
        console.log(req.params)
        req.session[req.params.name] = req.params.value;
        res.send(req.session);
    }

    function getSession(req, res) {
        var name = req.params['name'];
        var value = req.session[name];
        res.send(value);
    }

    function resetSession(req, res) {
        req.session['userId'] = '';
        res.send(req.session)
    }

    app.get('/api/session/set/:name/:value',
        setSession);
    app.get('/api/session/get/:name',
        getSession);
    // app.get('/api/session/get',
    //     getSessionAll);
    app.get('/api/session/reset', resetSession);
}
