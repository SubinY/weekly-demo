(() => {
    const toUpper = str => str.toUpperCase();
    let str = 'asdf';
    let b = str
        |> toUpper
        |> (str => `${str}sadf`)
    console.log(b, toUpper(str));
})()