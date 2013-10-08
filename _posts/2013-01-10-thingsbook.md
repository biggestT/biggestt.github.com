---
layout: post
title: "Thingsbook"
tagline: "A new social material network"
category: projects
cover: "thingsbookLogo.svg"
tags: []
---
{% include JB/setup %}

Today we own things in a pretty static way. While our social lives have become increasingly connected, our material possessions have not yet been invited to the same kind of networking.

Thingsbook is about connecting physical things and their owners in a distributed way. It's about you carrying around a digital representation of your possession and connecting it to friends you really trust. The Thingsbook way of sharing lets you use more while owning less.

![In May 2013 Thingsbook won the environmental category of Venture Cup East's new business idea competition.]({{ BASE_PATH }}/assets/images/moneyz.jpg)

My final goals for Thingsbook is to:

- Show how things can be shared and traded without unnecessary transports. The platform will be designed for local sharing and trading.

- Create a distributed system architecture for sharing things similar to the approach that Git has taken for source code sharing. I want to give users the rights to their content and not make profit out of peoples personal data.

- Prolong the lifetime of things by giving them persistent profiles that follow them instead of the ad-based system of today.

Of course I can't do all of these things myself so I am very much looking for like-minded people to join this cause!

In the meantime I am working on an initial prototype to demonstrate this concept. The prototype utilizes the Dropbox API for client side authorization as well as image hosting. The client is backed up by a simple Node.js server side that is connected to a Neo4j graph database. Hopefully I can showcase all of my belongings there sometime during this winter. 
