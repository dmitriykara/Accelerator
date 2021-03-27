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
    case Up
    case Down
    case Stable
}

class ViewController: UIViewController {
    
    @IBOutlet var resultsLabel: UILabel!
    @IBOutlet var XLabel: UILabel!
    @IBOutlet var YLabel: UILabel!
    @IBOutlet var ZLabel: UILabel!
    
    let changeX = 0.25;
    let changeY = 0.30;
    let changeZ = 0.15;
    let iterval = 0.07; // 70 ms
    let motionManager = CMMotionManager()
    var timer: Timer!
    var x = 0.0;
    var y = 0.0;
    var z = 0.0;
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        motionManager.startAccelerometerUpdates()
        
        timer = Timer.scheduledTimer(timeInterval: iterval, target: self, selector: #selector(ViewController.update), userInfo: nil, repeats: true)
    }
    
    func getMotion() -> Motion {
        if let accelerometerData = motionManager.accelerometerData {
            let new_x = accelerometerData.acceleration.x;
            let new_y = accelerometerData.acceleration.y;
            let new_z = accelerometerData.acceleration.z;
            
            if x == 0.0 && y == 0.0 {
                x = new_x
                y = new_y
                z = new_z
                return Motion.Stable
            }
            
            XLabel.text = "\(new_x)"
            YLabel.text = "\(new_y)"
            ZLabel.text = "\(new_z)"
            
            let xUp = (new_x > x) && (new_x - x) > changeX;
            let xDown = (new_x < x) && (x - new_x) > changeX;
            let yUp = (new_y > y) && (new_y - y) > changeY;
            let yDown = (new_y < y) && (y - new_y) > changeY;
            let zUp = (new_z > z) && (new_z - z) > changeY;
            let zDown = (new_z < z) && (z - new_z) > changeY;
            
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
            if zUp {
                return Motion.Up
            }
            if zDown {
                return Motion.Down
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
        let json: [String: Any] = ["motion": "\(motion)",]
        let jsonData = try? JSONSerialization.data(withJSONObject: json)
        
        let url = URL(string: "http://192.168.0.104:6000/motion")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("application/json", forHTTPHeaderField: "Accept")
        request.httpBody = jsonData
        
        let task = URLSession.shared.dataTask(with: request as URLRequest, completionHandler: {
            data, response, error in
            guard error == nil else {
                return
            }
            guard let data = data else {
                return
            }
            do {
                if let json = try JSONSerialization.jsonObject(with: data, options: .mutableContainers) as? [String: Any] {
                    print(json)
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
