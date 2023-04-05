import { useRef, useState, useEffect } from 'react'
import axios from '../../app/api/user'
import { Icon } from '@iconify/react';
import React from "react"


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_ ]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$%]).{8,24}$/
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const REGISTER_URL = '/pros'

const ProRegister = () => {

    // set the focus on the user input when the component loads
    const orgRef = useRef()
    const errRef = useRef()

    const [orgname, setOrg] = useState('')
    const [validorg, setValidOrg] = useState(false)

    const [ownername, setOwnerName] = useState('')
    const [validownername, setValidOwnerName] = useState(false)

    const [address, setAddress] = useState('')
    const [validAddress, setValidAddress] = useState(false)
    const [addressFocus, setAddressFocus] = useState(false)

    const [town, setTown] = useState('')
    const [validTown, setValidTown] = useState(false)
    const [townFocus, setTownFocus] = useState(false)

    const [county, setCounty] = useState('')
    const [validCounty, setValidCounty] = useState(false)
    const [countyFocus, setCountyFocus] = useState(false)

    const [postcode, setPostCode] = useState('')
    const [validPostCode, setValidPostCode] = useState(false)
    const [pcFocus, setPcFocus] = useState(false)

    const [business, setBusiness] = useState('')
    const [validBusiness, setValidBusiness] = useState(false)
    const [businessFocus, setBusinessFocus] = useState(false)

    const [website, setWebsite] = useState('')
    const [validWebsite, setValidWebsite] = useState(false)
    const [websiteFocus, setWebsiteFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [charity, setCharity] = useState('')
    const [validCharity, setValidCharity] = useState(false)
    const [charityFocus, setCharityFocus] = useState(false)

    const [password, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        orgRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(orgname, ownername)
        setValidOrg(result)
        setValidOwnerName(result)
        setValidAddress(result)
        setValidTown(result)
        setValidCounty(result)
        setValidPostCode(result)
        setValidBusiness(result)
        setValidWebsite(result)
        setValidCharity(result)
    }, [orgname, ownername])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        // console.log(result)
        // console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        // console.log(result)
        // console.log(password)
        setValidPwd(result)
        const match = password === matchPwd
        setValidMatch(match)
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [orgname, address, email, password, matchPwd])

    const handleRegister = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(orgname);
        const v2 = PWD_REGEX.test(password);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({
                    orgname, ownername, address, town, county, postcode,
                    business, website, email, charity, password
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);

            //clear state and controlled inputs
            //need value attrib on inputs for this
            setOrg('');
            setEmail('')
            setPwd('');
            setMatchPwd('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Sorry, that username or email has been taken.');
            } else {
                console.log(err.response.data)
                console.log(err.response.status)
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (<h1>Amazing</h1>) : (
                <>
                    <div className="grid place-content-center antialiased font-black">
                        <form className="border rounded-md p-2" onSubmit={handleRegister}>
                            <div className="flex justify-center text-2xl">Organisation Registration
                            <Icon icon="file-icons:leaflet" className="text-1xl" color="darkgreen" width="16" height="35" rotate={1} />
                            </div>
                                <div className='flex flex-col'>
                                    <div className="flex flex-col p-4 text-2xl">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                        <label htmlFor="orgname" className="">Organisation Name</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="orgname"
                                            ref={orgRef}
                                            autoComplete="off"
                                            onChange={(e) => setOrg(e.target.value)}
                                            required
                                            aria-invalid={validorg ? "false" : "true"}
                                            aria-describedby="orgnote" />

                                        <label htmlFor="ownername" className="">Owner Name</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="ownername"
                                            autoComplete="off"
                                            onChange={(e) => setOwnerName(e.target.value)}
                                            required
                                        />

                                        <label htmlFor="address" className="">Address</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="addressnote"
                                            autoComplete="off"
                                            onChange={(e) => setAddress(e.target.value)}
                                            required
                                            onFocus={() => setAddressFocus(true)}
                                            onBlur={() => setAddressFocus(false)}
                                        />
                                        <p id="addressnote"
                                            className={addressFocus && address && !validAddress ? "instructions" : "offscreen"}>
                                            Not a valid Address Line.<br />
                                        </p>

                                        <label htmlFor="town" className="">Town</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="town"
                                            autoComplete="off"
                                            onChange={(e) => setTown(e.target.value)}
                                            required
                                            aria-invalid={validTown ? "false" : "true"}
                                            aria-describedby="townnote"
                                            onFocus={() => setTownFocus(true)}
                                            onBlur={() => setTownFocus(false)} />
                                        <p id="townnote"
                                            className={townFocus && town && !validTown ? "instructions" : "offscreen"}>
                                            Not a valid Town.<br />
                                        </p>

                                        <label htmlFor="county" className="">County</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="county"
                                            autoComplete="off"
                                            onChange={(e) => setCounty(e.target.value)}
                                            required
                                            aria-invalid={validCounty ? "false" : "true"}
                                            aria-describedby="countynote"
                                            onFocus={() => setCountyFocus(true)}
                                            onBlur={() => setCountyFocus(false)} />
                                        <p id="countynote"
                                            className={countyFocus && county && !validCounty ? "instructions" : "offscreen"}>
                                            Not a valid County.<br />
                                        </p>

                                        <label htmlFor="postcode" className="">Postcode</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="postcode"
                                            autoComplete="off"
                                            onChange={(e) => setPostCode(e.target.value)}
                                            required
                                            aria-invalid={validPostCode ? "false" : "true"}
                                            aria-describedby="postcodenote"
                                            onFocus={() => setPcFocus(true)}
                                            onBlur={() => setPcFocus(false)} />
                                        <p id="postcodenote"
                                            className={pcFocus && postcode && !validPostCode ? "instructions" : "offscreen"}>
                                            Not a valid Postcode.<br />
                                        </p>
                                    </div>

                                    <div className='flex flex-col p-4 text-2xl'>
                                        <label htmlFor="business" className="">Type of Organisation</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="business"
                                            autoComplete="off"
                                            onChange={(e) => setBusiness(e.target.value)}
                                            required
                                            aria-invalid={validBusiness ? "false" : "true"}
                                            aria-describedby="businessnote"
                                            onFocus={() => setBusinessFocus(true)}
                                            onBlur={() => setBusinessFocus(false)} />
                                        <p id="businessnote"
                                            className={businessFocus && business && !validBusiness ? "instructions" : "offscreen"}>
                                            Not a valid Business Name.<br />
                                        </p>

                                        <label htmlFor="website" className="">Website Name</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="website"
                                            autoComplete="off"
                                            onChange={(e) => setWebsite(e.target.value)}
                                            required
                                            aria-invalid={validWebsite ? "false" : "true"}
                                            aria-describedby="websitenote"
                                            onFocus={() => setWebsiteFocus(true)}
                                            onBlur={() => setWebsiteFocus(false)} />
                                        <p id="websitenote"
                                            className={websiteFocus && website && !validWebsite ? "instructions" : "offscreen"}>
                                            Not a valid Website Name.<br />
                                        </p>

                                        <label htmlFor="email" className="">Email Address</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="email"
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            aria-invalid={validEmail ? "false" : "true"}
                                            aria-describedby="emailnote"
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)} />
                                        <p id="emailnote"
                                            className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                            Not a valid Email.<br />
                                        </p>

                                        <label htmlFor="charity" className="">Charity Number</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="text"
                                            id="charity"
                                            autoComplete="off"
                                            onChange={(e) => setCharity(e.target.value)}
                                            required
                                            aria-invalid={validCharity ? "false" : "true"}
                                            aria-describedby="charityenote"
                                            onFocus={() => setCharityFocus(true)}
                                            onBlur={() => setCharityFocus(false)} />
                                        <p id="charitynote"
                                            className={charityFocus && charity && !validCharity ? "instructions" : "offscreen"}>
                                            Not a valid Charity Number.<br />
                                        </p>

                                        <label htmlFor="password" className="">Password</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="password"
                                            id="password"
                                            onChange={(e) => setPwd(e.target.value)}
                                            required
                                            aria-invalid={validPwd ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPwdFocus(true)}
                                            onBlur={() => setPwdFocus(false)} />
                                        <p id="pwdnote"
                                            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                            You'll want a strong password!<br />
                                            Minimum 8 characters<br />
                                            Can include:
                                            <span aria-label="exclamation mark">!</span>
                                            <span aria-label="at symbol">@</span>
                                            <span aria-label="dollar sign">$</span>
                                            <span aria-label="percent">%</span>
                                        </p>

                                        <label htmlFor="password" className="">Confirm Password</label>
                                        <input
                                            className="text-left shadow border rounded"
                                            type="password"
                                            id="confirm_pwd"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)} />
                                        <p id="confirmnote"
                                            className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                            Passwords must match.
                                        </p>
                                    </div>
                                </div>
                                <div className='flex justify-center'>
                                    <button disabled={!validorg || !validownername || !validPwd || !validMatch || !validEmail ? true : false} className="flex justify-center border rounded-md mt-2 p-2 hover:bg-cugreen ease-in duration-300 hover:text-white">Sign Up!</button>
                                </div>
                                <div className='flex justify-center'>
                                    <a className="justify-center border rounded-md mt-2 p-2  hover:bg-cugreen ease-in duration-300 hover:text-white" href="/for-login">Already have an account?</a>
                                </div>
                    
                        </form>
                    </div>
                </>
            )}
        </>
    )
}
export default ProRegister;

//mb-4 md:w1/2 md:flex md:flex-wrap md:justify-between