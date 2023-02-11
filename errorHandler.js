/**
 *
 *
 * @author Drazi Crendraven
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {function} next
 * @returns {*}
 */
export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.setHeader("content-type", "text/html");
    res.status(500);
    console.error(err);
    res.render('error', { title: "Server Error", message: "Server error" });
}
