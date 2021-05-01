import User from '../models/User.js';

// !POST NEW USER
export async function userPost(req, res) {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const nickname = req.body.nickname;
    const address = req.body.address;
    const bio = req.body.bio;
    
    
    const userData = {
        name: name,
        lastname: lastname,
        nickname: nickname,
        address: address,
        bio: bio
    }
    
    try {
        await new User(userData).save();
        res.status(200).json(userData);
    }
    catch (error) {
        if (error.code == 11000){
            res.status(400).json({ reason: "Nickname already exists" });
        }
        else {
            res.status(500).json(error.message);
        }
    }
}

// !GET BY NAME
export async function userGetByNames(req, res) {
    const name = req.query.name;
    const lastname = req.query.lastname;

    const query = {}

    if(name) {
        query.name = { $regex : new RegExp(name, "i") }
    }

    if(lastname) {
        query.lastname = { $regex : new RegExp(lastname, "i") }
    }

    try {
        if (Object.entries(query).length === 0) {
            res.status(400).json({ message: "Please provide NAME and/or LASTNAME query params!" });
        } else {
            const findbynames = await User.find(query);
            res.status(200).json({ users: findbynames });
            }
    } catch {
        res.status(400).json({message: "Cannot resolve query!"});
    }
}

// !GET BY NICKNAME
export async function userGetNickname(req, res) {
    const nickParam = req.params.nickname;

    try {
        const findByNickname = await User.findOne({ nickname: { $regex : new RegExp(nickParam, "i") } });
        res.status(200).json({ name: findByNickname.name, lastname: findByNickname.lastname, nickname: findByNickname.nickname });
    } catch {
        res.status(400).json({message: "Cannot find this user!"});
    }
}

// !UPDATE LASTNAME AND/OR ADDRESS USING ID
export async function userUpdateNameAndAdrressById(req, res) {
    const id = req.params.id
    const lastname = req.body.lastname;
    const address = req.body.address;

    const fields = {}

    if(lastname) {
        fields.lastname = lastname;
    }
    if(address) {
        fields.address = address;
    }

    try {
        await User.findOneAndUpdate({ _id: id }, fields, { new: true , useFindAndModify: false}, (err, doc) => {
                 if(err){return}
                 if(doc == null) {
                    res.status(400).json({ message: "Nonexistent user!" });
                    return
                }
                res.status(200).json(doc);
            });
    } catch (error) {
        if (error.kind == "ObjectId") {
            res.status(400).json({ message: "User ID inexistent" });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
}

// !UPDATE USER NICKNAME BY ID
export async function userUpdateNickById(req, res) {
    const id = req.params.id;
    const nickname = req.body.nickname;

    try {
        await User.findOneAndUpdate({_id: id}, {nickname: nickname}, {new: true, useFindAndModify: false}, (err, doc) => {
            if(err){return}
            if(doc == null) {
                res.status(400).json({ message: "Nonexistent user!" });
                return
            }
            res.status(200).json(doc);
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Nickname already in use!"});
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
}

// !DELETE USER USING ID
export async function userDelete(req, res) {
    const id = req.params.id

    try {
        const deleting = await User.deleteOne({ _id: id });
        if (deleting.deletedCount === 0) {
            res.status(400).json({ message: "Already deleted user or nonexistent user!" });
        } else {
            res.status(200).json({ message: "Sucess deleting user"});
        }
            
    } catch (error) {
        res.status(500).json(error.message);
    }
}