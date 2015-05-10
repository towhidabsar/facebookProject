﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Mvc;
using DayPilot.Web.Mvc.Json;
using facebookProject.Models;

public class EventController : Controller
{
    public ActionResult Edit(string id)
    {
        var e = new EventManager().Get(id) ?? new Event();
        return View(e);
    }

    [System.Web.Mvc.AcceptVerbs(HttpVerbs.Post)]
    public ActionResult Edit(FormCollection form)
    {
        DateTime start = Convert.ToDateTime(form["Start"]);
        DateTime end = Convert.ToDateTime(form["End"]);
        new EventManager().EventEdit(form["Id"], form["Text"], start, end);
        return JavaScript(SimpleJsonSerializer.Serialize("OK"));
    }


    public ActionResult Create()
    {
        return View(new Event()
        {
            eventstart = Convert.ToDateTime(Request.QueryString["start"]),
            eventend = Convert.ToDateTime(Request.QueryString["end"])
        });
    }

    [System.Web.Mvc.AcceptVerbs(HttpVerbs.Post)]
    public ActionResult Create(FormCollection form)
    {

        DateTime start = Convert.ToDateTime(form["Start"]);
        DateTime end = Convert.ToDateTime(form["End"]);
        new EventManager().EventCreate(start, end, form["Text"]);
        return JavaScript(SimpleJsonSerializer.Serialize("OK"));
    }
}
