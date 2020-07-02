import React from 'react'

export const Ul = (props) => {
    const className = props.className ?
        "pure-menu-list " + props.className : "pure-menu-list"

    return (
        <ul className={className}>
            {props.children}
        </ul>
    )
}

export const Li = (props) => {
    const className = props.className ?
        "pure-menu-item " + props.className : "pure-menu-item"

    return (
        <li className={className}>
            {props.children}
        </li>
    )
}

export const Button = (props) => {
    const className = props.className ?
        "pure-button " + props.className : "pure-button"

    if (props.isLoading) {
        return (
            <button
                className={className}
                style=    {props.style}
                disabled
            >
                Loading...
            </button>
        )
    }

    return (
        <button
            className={className}
            onClick=  {props.clickHandler}
            style=    {props.style}
            id=       {props.id}
        >
            {props.text}
        </button>
    )
}

export const Image = (props) => {
    const className = props.className ?
        "img-responsive " + props.className : "img-responsive"

    return (
        <img
            className={className}
            src=      {props.src}
            alt=      {props.alt}
        />
    )
}

export const Label = (props) => {
    const className = props.className ?
        "label-block " + props.className : "label-block"

    return (
        <label 
            className={className}
            htmlFor=  {props.htmlFor}>
            {props.text}
        </label>
    )
}

export const Input = (props) => {
    const className = props.className ?
        props.className : null

    return (
        <input
            className=  {className}
            type=       {props.type}
            name=       {props.name}
            value=      {props.value}
            style=      {props.style}
            placeholder={props.placeholder}
            onChange=   {props.inputHandler}
        />
    )
}

export const BlockInput = (props) => {
    const className = props.className ?
        props.className : null

    const tooltip = props.field.error ?
        (<div className="tooltip">
            <span>{props.field.error}</span>
        </div>) :
        <span></span>

    return (
        <div style={{ position: 'relative' }} >
            <input
                className=  {className}
                type=       {props.type}
                name=       {props.name}
                value=      {props.field.value}
                style=      {props.style}
                placeholder={props.placeholder}
                onChange=   {props.inputHandler}
            />
            { tooltip }
        </div>
    )
}

export const Card = (props) => {
    const className = props.className ?
        "card " + props.className : "card"

    return (
        <div 
            className={className}
            style=    {props.style}
        >
            {props.children}
        </div>
    )
}

export const CardBody = (props) => {
    const className = props.className ?
        "card-body " + props.className : "card-body"

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export const CardImage = (props) => {
    const className = props.className ?
        "card-image " + props.className : "card-image"

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export const CardTitle = (props) => {
    const className = props.className ?
        "card-title " + props.className : "card-title"

    return (
        <div className={className}>
            {props.children}
        </div>
    )
}

export const CardFooter = (props) => {
    const className = props.className ?
        "card-footer " + props.className : "card-footer"

    return (
        <div 
            className={className} 
            style=    {props.style}
        >
            {props.children}
        </div>
    )
}

export const Alert = (props) => {
    if(!props.className) return <span></span>

    const className = "alert " + props.className

    return (
        <div
            className={className}
            style=    {props.style}
        >
            <span
                className="alert-close"
                onClick=  {props.clickHandler}
            >
                &times;
            </span>
            {props.children}
        </div>
    )
}

