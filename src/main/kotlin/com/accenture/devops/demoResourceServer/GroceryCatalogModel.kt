package com.accenture.devops.demoResourceServer

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id

@Entity
data class GroceryCatalogModel(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    var id: Long = -1,
    var productName: String = "",
    var type: String = "",
    var manufacturer: String = "",
    var price: Double = 0.0,
) {}