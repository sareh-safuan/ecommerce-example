import React from 'react'

export const Ul = ({ children, css }) => {
    let _css = "pure-menu-list "
    if (css) _css += css

    return (
        <ul className={_css}>
            {children}
        </ul>
    )
}

export const Li = ({ children, css }) => {
    let _css = "pure-menu-item "
    if (css) _css += css

    return (
        <li className={_css}>
            {children}
        </li>
    )
}

export const Button = ({ css, id, style, text, clickHandler }) => {
    let _css = "pure-button "
    if (css) _css += css

    return (
        <button
            className={_css}
            onClick={clickHandler}
            style={style}
            id={id}
        >
            {text}
        </button>
    )
}

export const Image = ({ css, src, alt }) => {
    let _css = "img-responsive "
    if (css) _css += css

    return (
        <img src={src} alt={alt} className={_css} />
    )
}

export const Label = ({ css, htmlFor, text }) => {
    let _css = "label-block "
    if (css) _css += css

    return (
        <label className={_css} htmlFor={htmlFor}>
            {text}
        </label>
    )
}

export const Input = (
    { css, type, name, value, placeholder, style, changeHandler }
    ) => {
    let _css = ""
    if (css) _css += css

    return (
        <input
            className={_css}
            type={type}
            name={name}
            value={value}
            style={style}
            placeholder={placeholder}
            onChange={changeHandler}
        />
    )
}

export const BlockInput = (
    { css, type, name, value, placeholder, style, changeHandler }
    ) => {
    let _css = ""
    if (css) _css += css

    return (
        <div>
            <input
                className={_css}
                type={type}
                name={name}
                value={value}
                style={style}
                placeholder={placeholder}
                onChange={changeHandler}
            />
        </div>
    )
}

export const Card = ({ children, css, style }) => {
    let _css = "card "
    if (css) _css += css

    return (
        <div className={_css} style={style} >
            {children}
        </div>
    )
}

export const CardBody = ({ children, css }) => {
    let _css = "card-body "
    if (css) _css += css

    return (
        <div className={_css}>
            {children}
        </div>
    )
}

export const CardImage = ({ children, css }) => {
    let _css = "card-img "
    if (css) _css += css

    return (
        <div className={_css}>
            {children}
        </div>
    )
}

export const CardTitle = ({ children, css }) => {
    let _css = "card-title "
    if (css) _css += css

    return (
        <div className={_css}>
            {children}
        </div>
    )
}

export const CardFooter = ({ children, css, style }) => {
    let _css = "card-footer"
    if (css) _css += css

    return (
        <div className={_css} style={style}>
            { children }
        </div>
    )
}

