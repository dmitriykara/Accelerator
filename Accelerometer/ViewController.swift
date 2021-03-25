//
//  ViewController.swift
//  Accelerometer
//
//  Created by Dmitriy Kara on 19.03.2021.
//

import UIKit
import CoreMotion

enum Motion {
    case Left
    case Right
    case Forward
    case Backward
    case Stable
}

class ViewController: UIViewController {
    
    @IBOutlet var resultsLabel: UILabel!
    @IBOutlet var XLabel: UILabel!
    @IBOutlet var YLabel: UILabel!
    @IBOutlet var ZLabel: UILabel!
    
    let changeX = 0.25;
    let changeY = 0.30;
    let iterval = 0.07; // 70 ms
    let motionManager = CMMotionManager()
    var timer: Timer!
    var x = 0.0;
    var y = 0.0;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        motionManager.startAccelerometerUpdates()
        
        timer = Timer.scheduledTimer(timeInterval: iterval, target: self, selector: #selector(ViewController.update), userInfo: nil, repeats: true)
    }
    
    func getMotion() -> Motion {
        if let accelerometerData = motionManager.accelerometerData {
            let new_x = accelerometerData.acceleration.x;
            let new_y = accelerometerData.acceleration.y;
            
            if x == 0.0 && y == 0.0 {
                x = new_x
                y = new_y
                return Motion.Stable
            }
            
            XLabel.text = "\(accelerometerData.acceleration.x)"
            YLabel.text = "\(accelerometerData.acceleration.y)"
            ZLabel.text = "\(accelerometerData.acceleration.z)"
            
            let xUp = (new_x > x) && (new_x - x) > changeX;
            let xDown = (new_x < x) && (x - new_x) > changeX;
            let yUp = (new_y > y) && (new_y - y) > changeY;
            let yDown = (new_y < y) && (x - new_y) > changeY;
            
            if xUp {
                return Motion.Right
            }
            if xDown {
                return Motion.Left
            }
            if yUp {
                return Motion.Forward
            }
            if yDown {
                return Motion.Backward
            }
        }
        return Motion.Stable
    }
    
    @objc func update() {
        let  motion = getMotion()
        print(motion)
        resultsLabel.text = "\(motion)"
        submitAction(motion: motion)
        if motion == Motion.Stable {
            resultsLabel.textColor = UIColor.green
        } else {
            resultsLabel.textColor = UIColor.red
        }
    }
    
    func submitAction(motion: Motion) {
        
        //declare parameter as a dictionary which contains string as key and value combination. considering inputs are valid
        
        let parameters = [
            "motion": motion,
        ]
        
        //create the url with URL
        let url = URL(string: "http://localhost:5000/")! //change the url
        
        //create the session object
        let session = URLSession.shared
        
        //now create the URLRequest object using the url object
        var request = URLRequest(url: url)
        request.httpMethod = "POST" //set http method as POST
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: .prettyPrinted) // pass dictionary to nsdata object and set it as request body
        } catch let error {
            print(error.localizedDescription)
        }
        
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        
        //create dataTask using the session object to send data to the server
        let task = session.dataTask(with: request as URLRequest, completionHandler: { data, response, error in
            
            guard error == nil else {
                return
            }
            
            guard let data = data else {
                return
            }
            
            do {
                //create json object from data
                if let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any] {
                    print(json)
                    // handle json...
                } else {
                    print(data)
                }
            } catch let error {
                print(error.localizedDescription)
            }
        })
        task.resume()
    }
}
