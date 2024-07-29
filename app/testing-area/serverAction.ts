'use server'
export const serverAction = async () => {
    console.log(
        Date.now(),
        'This log should be visible on server side. During local debugging, should be visible in Visual Studio Code, or other tool used to run the applicaitn.'
    )
}
